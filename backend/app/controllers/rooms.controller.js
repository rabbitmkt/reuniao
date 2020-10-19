import fs from "fs";
import uuid from "uuid/v4";
import path from "path";

const roomFilePath = "../file/matrix.room.web.json";

const fetchFromFile = () => {
  const roomFileExists = fs.existsSync(roomFilePath);
  if (!roomFileExists) {
    createRoomFileSync();
  }

  const roomsData = fs.readFileSync(roomFilePath);
  const roomsDetail = JSON.parse(roomsData);

  return new Promise(resolve => resolve(roomsDetail));
};

const createRoomFileSync = () => {
  const roomsData = [];

  roomsData[0] = {
    id: uuid(),
    name: "Bem-Vindo(a) - Grupo Rabbit",
    disableMeeting: true,
  };

  const niceNames = [
    "Criação - Núcleo 1",
    "Criação - Núcleo 2",
    "Criação - Núcleo 3",
    "Criação - Núcleo 4",
    "Criação - Núcleo 5",
    "Criação - Núcleo 7",
    "Redação",
    "Rabbit Digital",
    "GRs Rabbit",
    "Sala de Reunião 1",
    "Sala de Reunião 2",
    "Sala de Reunião 3",
    "Sala de Reunião 4",
    "Sala de Reunião 5",
  ];

  for (const niceName of niceNames) {
    roomsData.push({
      id: uuid(),
      name: niceName
    });
  }

  fs.mkdirSync(path.dirname(roomFilePath), { recursive: true });
  fs.writeFileSync(roomFilePath, JSON.stringify(roomsData));
};

const fetchFromEnvironment = (env) => {
  const roomsData = env.ROOMS_DATA;
  const roomsDetail = JSON.parse(roomsData);

  return new Promise(resolve => resolve(roomsDetail));
};

const fetchRooms = (strategy) => {
  switch (strategy) {
    // TODO add suport to fetch from endpoint
    case "ENVIRONMENT":
      return fetchFromEnvironment(process.env);
    default:
      return fetchFromFile();
  }
};

export default fetchRooms;
