const z1p = require("../index");

describe("z1p test", () => {
  describe("functions", () => {
    describe("raw", () => {
      test("get one from one country", () => {
        const result = z1p(["ua"]).raw(v => v.zip_code == "59330");
        expect(result).toHaveLength(1);
      });
      test("get one from two", () => {
        const result = z1p(["Ua", "us"]).raw(v => v.zip_code == "59330");
        expect(result).toHaveLength(2);
      });
    });

    describe("find", () => {
      test("find by zip_code", () => {
        const result = z1p(["ua"]).findBy("zip_code", "59330");

        expect(result).toHaveLength(1);
      });

      test("find by zip_code with memo", () => {
        z1p(["ua"], { memorize: true }).findBy("zip_code", "59330");
        const result = z1p(["ua"], { memorize: true }).findBy(
          "zip_code",
          "59330"
        );

        expect(result).toHaveLength(1);
      });

      test("find by accuracy", () => {
        const result = z1p(["ua"]).findBy("accuracy", "1");

        expect(result.length).toBeGreaterThanOrEqual(1);
      });

      test("find by country_code", () => {
        const result = z1p(["ua"]).findBy("country_code", "US");

        expect(result).toHaveLength(0);
      });

      test("find by latitude with memo", () => {
        const result = z1p(["US"], { memorize: true }).findBy(
          "latitude",
          "47.1008"
        );

        expect(result.length).toBeGreaterThanOrEqual(1);
      });

      test("find by longitude", () => {
        const result = z1p(["US"]).findBy("longitude", "-104.7287");

        expect(result.length).toBeGreaterThanOrEqual(1);
      });

      test("find by place with memo", () => {
        const result = z1p(["US"], { memorize: true }).findBy(
          "place",
          "Glendive"
        );

        expect(result).toHaveLength(1);
      });

      test("find by province_code", () => {
        const result = z1p(["US"]).findBy("province_code", "021");

        expect(result.length).toBeGreaterThanOrEqual(1);
      });

      test("find by state with memo", () => {
        const result = z1p(["us"], { memorize: true }).findBy(
          "state",
          "Montana"
        );

        expect(result.length).toBeGreaterThanOrEqual(1);
      });

      test("find by state_code", () => {
        const result = z1p(["us"]).findBy("state_code", "MT");

        expect(result.length).toBeGreaterThanOrEqual(1);
      });
    });
  });

  describe("data", () => {
    test("module", () => {
      const result = z1p(["ua", "us"]).raw(v => v.zip_code == "59330");
      expect(result).toHaveLength(2);
    });

    test("array of objects", () => {
      const result = z1p([
        [
          {
            zip_code: "59330"
          }
        ],
        [
          {
            zip_code: "59330"
          },
          {
            zip_code: "59333"
          }
        ]
      ]).raw(v => v.zip_code == "59330");
      expect(result).toHaveLength(2);
    });

    test("array of arrays", () => {
      const result = z1p([
        [[, , , , , , , , , , , "59330"]],
        [[, , , , , , , , , , , "59330"], [, , , , , , , , , , , "59331"]]
      ]).raw(v => v.zip_code == "59330");
      expect(result).toHaveLength(2);
    });

    test("mixed", () => {
      const result = z1p([
        [[, , , , , , , , , , , "59330"]],
        [
          {
            zip_code: "59330"
          },
          {
            zip_code: "59333"
          }
        ],
        "ua",
        "us"
      ]).raw(v => v.zip_code == "59330");
      expect(result).toHaveLength(4);
    });
  });

  describe("throws", () => {
    test("no module", () => {
      expect(() => {
        z1p(["AD"]).findBy("zip_code", "59330");
      }).toThrow();
    });
  });
});
