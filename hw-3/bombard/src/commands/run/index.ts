import { Command, Flags } from "@oclif/core";

interface IStats {
  success: number;
  fail: number;
  avg: number;
}

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
    const timeZero = Date.now();
    const { args, flags } = await this.parse(Hello);
    const http = require("http");

    const reqCount = flags.requests ?? 10;
    const concurr = flags.concurrency ?? 4;
    const withBody = flags.body;

    const url = args.url;

    let success = 0;
    let fail = 0;
    let avg = 0;

    await bombard(reqCount, concurr, url);

    this.log(`bombarded ${reqCount} times`);
    this.log(`${success} successful, ${fail} failing`);

    if (success > 0) {
      avg /= success;
      this.log(`average response time ${avg / success}ms`);
    }
  }
}
