import marketplace from "../../fixtures/marketplace";

export function expectMatchesActivitiesFixture(data: any) {
  expect(data.length).toEqual(2);
  expect(data[0].id).toStrictEqual(marketplace.activities[0].id);
  expect(data[0].amount).toStrictEqual("1.0");
  expect(data[0].price).toStrictEqual("1.25");
  expect(data[0].previousPrice).toStrictEqual(null);
  expect(data[0].timeStamp).toStrictEqual(marketplace.activities[0].timeStamp);
  expect(data[0].activityType).toStrictEqual(
    marketplace.activities[0].activityType.toString()
  );
  expect(data[0].seller["id"]).toStrictEqual(
    marketplace.activities[0].seller.id
  );
  expect(data[1].id).toStrictEqual(marketplace.activities[1].id);
  expect(data[1].amount).toStrictEqual(null);
  expect(data[1].price).toStrictEqual("1.25");
  expect(data[1].previousPrice).toStrictEqual("12.5");
  expect(data[1].timeStamp).toStrictEqual(marketplace.activities[1].timeStamp);
  expect(data[1].activityType).toStrictEqual(
    marketplace.activities[1].activityType.toString()
  );
  expect(data[1].seller["id"]).toStrictEqual(
    marketplace.activities[1].seller.id
  );
}
