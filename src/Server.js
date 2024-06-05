import { format_and_validate, validate_type } from "./DataTypes";

class Server {
  //This is for demo only
  static state = {
    channels: [
      {
        channel: 0,
        addresses: {
          device1: 3,
          device2: "hello",
          device3: false,
        },
      },
    ],
  };

  //Logs the processes
  static processes = new Set();

  //This is for demo only
  static demoStateRandomizer() {
    this.state.channels[0].addresses.device1 = Math.floor(Math.random() * 10);
    this.state.channels[0].addresses.device2 = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
    this.state.channels[0].addresses.device3 = !this.state.channels[0].addresses.device3;
  }
  //Deregisters all processes - call this at the very end just to make sure we clean up everything
  static deregisterAll() {
    this.processes.forEach((process) => {
      clearInterval(process);
    });
    this.processes.clear();
    console.log("Server deregistered");
  }

  static register(channel, address, interval, dataType, callback) {
    //Validation
    {
        if (typeof channel !== "number")
        throw new Error("Channel must be a number");
        if (typeof address !== "string")
        throw new Error("Address must be a string");
        if (typeof interval !== "number")
        throw new Error("Interval must be a number");
        if (interval < 0) throw new Error("Interval must be a positive number");
        if (typeof dataType !== "string")
            throw new Error("Data type must be a string");
        if (validate_type(dataType) === false) throw new Error("Invalid data type");
        if (typeof callback !== "function")
        throw new Error("Callback must be a function");
    }

    //TODO: Validate channel and address - Make sure they are valid
    //TODO: Validate dataType, make sure it corresponds to the data type at the location

    let processID = setInterval(() => {
      //TODO: Get data from devices. Below is just dummy data.
      let data = this.state.channels[channel].addresses[address];
      callback(data);
    }, interval);
    this.processes.add(processID);
    console.log(
      `Registered at ${channel} with address ${address} and interval ${interval}`
    );
    return processID;
  }

  static update(channel, address, data, dataType) {
    //Validation
    if (typeof channel !== "number")
      throw new Error("Channel must be a number");
    if (typeof address !== "string")
      throw new Error("Address must be a string");
    data = format_and_validate(data, dataType);
    //TODO: Validate channel and address - Make sure they are valid
    //TODO: Validate dataType, make sure it corresponds to the data type at the location
    this.state.channels[channel].addresses[address] = data;
  }

  static deregister(processID) {
    this.processes.delete(processID);
    clearInterval(processID);
  }
}
export default Server;
