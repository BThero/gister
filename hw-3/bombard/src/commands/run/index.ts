import { Command, Flags } from "@oclif/core";

export default class Run extends Command {
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
    const { args, flags } = await this.parse(Run);
    const http = require("http");
    const async = require("async");

    const reqCount = flags.requests ?? 10;
    const concurr = flags.concurrency ?? 4;
    // const withBody = flags.body;

    const url = args.url;
    const requests = [];
    const zeroTime = Date.now();

    for (let i = 0; i < reqCount; i += 1) {
      requests.push((callback: any) => {
        const startTime = Date.now();

        http
          .get(url, (res: any) => {
            let data = "";

            // A chunk of data has been received.
            res.on("data", (chunk: any) => {
              data += chunk;
            });

            // The whole response has been received. Print out the result.
            res.on("end", () => {
              const endTime = Date.now();

              callback(null, {
                call: startTime - zeroTime,
                duration: endTime - startTime,
                data: data,
              });
            });
          })
          .on("error", (error: any) => {
            callback(null, { error: error });
          });
      });
    }

    let success = 0;
    let fail = 0;
    let avg = 0;

    async.parallelLimit(requests, concurr, (err: any, results: any) => {
      if (err) {
        this.log("Some error occurred");
      } else {
        for (const result of results) {
          const { duration, error } = result;

          if (error) {
            fail += 1;
          } else {
            success += 1;
            avg += duration;
          }
        }

        this.log(`bombarded ${reqCount} times`);
        this.log(`${success} successful, ${fail} failing`);

        if (success > 0) {
          this.log(`average response time ${avg / success}ms`);
        }
      }
    });
  }
}
