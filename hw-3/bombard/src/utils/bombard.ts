const http = require("http");

interface IStats {
  success: number;
  fail: number;
  avg: number;
}

function requestPromise(url: string): Promise<any> {
  return new Promise((resolve, reject) => {
    http
      .get(url, (res: any) => {
        resolve(res);
      })
      .on("error", (error: any) => {
        reject(error);
      });
  });
}

export const bombard = async (
  n: number,
  limit: number,
  url: string
): Promise<IStats> => {
  if (n <= 0) {
    return {
      success: 0,
      fail: 0,
      avg: 0,
    };
  }

  const count = Math.min(n, limit);
  const startTime = Date.now();
  let finished = 0;

  const res: IStats = {
    success: 0,
    fail: 0,
    avg: 0,
  };

  for (let i = 0; i < count; i += 1) {
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

          finished += 1;
          res.success += 1;
          res.avg += endTime - startTime;

          // this.log(`got response: ${data} in ${endTime - startTime}ms`);
        });
      })
      .catch((error) => {
        // this.log(`got error: ${error}`);
        res.fail += 1;
        finished += 1;
      })
      .finally(() => {
        if (finished === count) {
          await bombard(n - count, limit, url).then((_res) => {
            res.success += _res.success;
            res.fail += _res.fail;
            res.avg += _res.avg;
          });
        }
      });
  }

  return res;
};
