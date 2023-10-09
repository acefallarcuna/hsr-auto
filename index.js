import { handleFlag } from "./lib/flag-handler.js";

// Function to ping an HTML file
async function pingHTMLFile() {
    const url = "https://acefallarcuna.github.io/hsr-auto/"; // Replace with your actual GitHub URL
    
    try {
        const response = await fetch(url);

        if (response.ok) {
            console.log("HTML file is reachable!");
        } else {
            console.log("HTML file is not reachable or encountered an error.");
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

const importModule = async (module, path) => {
	const { definitions } = await import(`./${path}/index.mjs`);
	await module.importData(definitions);
};

(async function () {
	const { default: initObjects } = await import("./core/index.js");
	globalThis.sr = await initObjects();

	const { default: commandData } = await import("./commands/index.js");
	const commands = await commandData;
	await sr.Command.importData(commands.definitions);

	await handleFlag(process.argv);
	await importModule(sr.Cron, "crons");

	const initialPlatforms = [
		"Discord",
		"Telegram"
	];

	for (const platform of initialPlatforms) {
		let Controller = null;
		try {
			Controller = await import(`./controllers/${platform.toLocaleLowerCase()}.js`);
		}
		catch (e) {
			console.error(`Failed to load ${platform} controller`, e);
			continue;
		}

		try {
			sr[platform] = new Controller.default();
		}
		catch (e) {
			console.error(`Failed to initialize ${platform} controller`, e);
			continue;
		}
	}
  process.on("unhandledRejection", async (reason) => {
          if (!(reason instanceof Error)) {
              return;
          }
  
          console.error(reason);
      });
  
  // Call the pingHTMLFile function initially
  await pingHTMLFile();

  // Ping the HTML file every 30 seconds
  setInterval(pingHTMLFile, 30000); // 30 seconds in milliseconds
})();