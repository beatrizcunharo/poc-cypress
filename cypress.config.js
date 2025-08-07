const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportHeight: 800,
  viewportWidth: 1280,
  e2e: {},
  //video: true - ligar vídeos do cypress do teste 
});
