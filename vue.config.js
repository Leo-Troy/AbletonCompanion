const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
      electronBuilder: {
          nodeIntegration: true,
          builderOptions: {
            publish: {
              provider: "github",
              owner: "MrLeoTroy",
              repo: "ableton-companion",
              releaseType: "release",
              token: process.env.GH_TOKEN
            },
            appId: "com.leotroy.abletoncompanion",
            productName: "Ableton Companion",
            win: {
                target: "nsis",
                icon: "dist/icon.ico"
            },
            nsis: {
                oneClick: false,
                installerIcon: "dist/icon.ico",
                uninstallerIcon: "dist/icon.ico",
                uninstallDisplayName: "Ableton Companion Uninstaller",
                license: "dist/license.md",
                allowToChangeInstallationDirectory: true
            },
            directories: {
                output: "dist"
            }
        }
    },
  },
})


