import test from "ava";
import SetmoreAPI from "./src";
import "dotenv/config";

let setmoreClient = null;

test.before(async () => {
  const setmore = await SetmoreAPI.init(process.env.API_KEY);
  setmoreClient = setmore;
});

// Appointments

test("Get paged appointments", async (t) => {
  const appointments = await setmoreClient.appointments.getPagedAppointments("22-03-2022", "23-03-2022");
  t.is(typeof appointments, "object");
});

test("Get non-paged appointments", async (t) => {
  const appointments = await setmoreClient.appointments.getAppointments("22-03-2022", "23-03-2022");
  t.is(typeof appointments, "object");
});

// Staff

test("Get staff members", async (t) => {
  const staffMembers = await setmoreClient.staff.getStaffMembers();
  t.is(typeof staffMembers, "object");
});

// Services

test("Get all services", async (t) => {
  const services = await setmoreClient.services.getAllServices();
  t.is(typeof services, "object");
});

test("Get service categories", async (t) => {
  const serviceCategories = await setmoreClient.services.getAllServices();
  t.is(typeof serviceCategories, "object");
});

test("Get services by category", async (t) => {
  const services = await setmoreClient.services.getServicesByCategory(process.env.CATEGORY_KEY);
  t.is(typeof services, "object");
});

// Timeslots

test("Get all timeslots", async (t) => {
  const setup = {
    staff_key: process.env.STAFF_KEY,
    service_key: process.env.SERVICE_KEY,
    selected_date: "23/03/2022",
  };
  const timeslots = await setmoreClient.timeslots.getAllTimeslots(setup);
  t.is(typeof timeslots, "object");
});
