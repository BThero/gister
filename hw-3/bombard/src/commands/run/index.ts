import { Command, Flags } from "@oclif/core";
import axios from "axios";

function randstr(length: number) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

function* requestGenerator(
  n: number,
  url: string,
  withBody: boolean,
  zeroTime: number
): any {
  for (let i = 0; i < n; i += 1) {
    yield (callback: any) => {
      const startTime = Date.now();

      axios
        .get(url, {
          data: withBody ? randstr(100) : null,
        })
        .then((res: any) => {
          const endTime = Date.now();

          callback(null, {
            call: startTime - zeroTime,
            duration: endTime - startTime,
            data: res.data,
          });
        })
        .catch((error: any) => {
          callback(null, { error: error });
        });
    };
  }
}

export default class Run extends Command {
  static description = "Run bombard";

  static examples = [
    `$ oex run http://localhost:3000 (./src/commands/run/index.ts)
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
    const async = require("async");

    const reqCount = flags.requests ?? 10;
    const concurr = flags.concurrency ?? 4;
    const withBody = flags.body;

    const url = args.url;
    const zeroTime = Date.now();

    let success = 0;
    let fail = 0;
    let avg = 0;

    async.parallelLimit(
      [...requestGenerator(reqCount, url, withBody, zeroTime)],
      concurr,
      (err: any, results: any) => {
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
      }
    );
  }
}
