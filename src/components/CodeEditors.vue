<template>
  <div>
    <div class="left-panel">
      <code-section
        v-for="codeBlock in codeBlocks"
        :key="codeBlock.id"
        :codeBlock="codeBlock"
        :selected="selectedBlock === codeBlock"
        @select="onSelectCodeBlock(codeBlock)"
      />
    </div>
    <code-panel
      v-if="selectedBlock"
      :codeBlock="selectedBlock"
      :isReadOnly="selectedUser.isMentor"
      @input="onCodeUpdate"
      class="right-panel"
    />
  </div>
</template>

<script>
import socket from "../socket";
import CodeSection from "./CodeSection";
import CodePanel from "./CodePanel";

export default {
  name: "CodeEditors",
  components: { CodeSection, CodePanel },
  data() {
    return {
      selectedBlock: null,
      selectedUser: null,
      codeBlocks: [],
      users: []
    };
  },
  methods: {
    onCodeUpdate(content) {
      if (this.selectedBlock) {
        this.selectedBlock.code = content;
        socket.emit("codeChange", this.selectedBlock);
      }
      
    },
    onSelectCodeBlock(codeBlock) {
      this.selectedBlock = codeBlock;

    },
  },
  created() {
    socket.on("initSections", (codeBlocks) => {
        this.codeBlocks = codeBlocks;
    });
    
    socket.on("codesections", (codeBlocks) => {
        for (let i = 0; i < 4; i++){
          this.codeBlocks[i].code = codeBlocks[i].code;
        }
    });
    socket.on("users", (users) => {
      this.users = users;
      this.users.forEach((user) => {
        if (user.userID === socket.id){
          this.selectedUser = user;
        }
      });
    });
  },
  destroyed() {
    socket.off("connect");
    socket.off("codeBlocks");
    socket.off("users");
  },
};
</script>

<style scoped>
.left-panel {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 260px;
  overflow-x: hidden;
  background-color: #3f0e40;
  color: white;
}

.right-panel {
  margin-left: 260px;
}
</style>
