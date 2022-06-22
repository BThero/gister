import { Command, Flags } from "@oclif/core";

export default class Hello extends Command {
  static description = "Say hello";

  static examples = [
    `$ oex hello friend --from oclif
hello friend from oclif! (./src/commands/hello/index.ts)
`,
  ];

  static flags = {
    concurrency: Flags.integer({
      char: "c",
      description: "number of parallel requests to perform at a time",
      required: false,
    }),
    requests: Flags.integer({
      char: "n",
      description: "number of requests to perform for the benchmarking session",
      required: false,
    }),
    body: Flags.boolean({
      char: "b",
      description:
        "if specified, should sent a random generated body with request",
      default: false,
    }),
  };

  static args = [
    {
      name: "url",
      description: "url which should be used for requests",
      required: true,
    },
  ];

  async run(): Promise<void> {
    const { args, flags } = await this.parse(Hello);
    const http = require("http");

    const reqCount = flags.requests ?? 10;
    const withBody = flags.body;

    const url = args.url;

    const requestPromise = (url: string) => {
      return new Promise((resolve, reject) => {
        http
          .get(url, (res: any) => {
            resolve(res);
          })
          .on("error", (error: any) => {
            reject(error);
          });
      });
    };

    const startTime = Date.now();

    for (let i = 0; i < reqCount; i += 1) {
      requestPromise(url)
        .then((res: any) => {
          let data = "";

          // A chunk of data has been received.
          res.on("data", (chunk: any) => {
            data += chunk;
          });

          // The whole response has been received. Print out the result.
          res.on("end", () => {
            const endTime = Date.now();
            this.log(`got response: ${data} in ${endTime - startTime}`);
          });
        })
        .catch((error) => {
          this.log(`got error: ${error}`);
        });
    }

    this.log(
      `args: ${JSON.stringify(args, null, 2)}\nflags: ${JSON.stringify(
        flags,
        null,
        2
      )}`
    );
  }
}