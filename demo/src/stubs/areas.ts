import type { AreaRegistryEntry } from "../../../src/data/area/area_registry";
import type { FloorRegistryEntry } from "../../../src/data/floor_registry";

const baseFloor = {
  aliases: [] as string[],
  icon: null,
  created_at: 0,
  modified_at: 0,
};

export const demoFloors: FloorRegistryEntry[] = [
  {
    ...baseFloor,
    floor_id: "ground",
    name: "Ground floor",
    level: 0,
  },
  {
    ...baseFloor,
    floor_id: "upstairs",
    name: "Upstairs",
    level: 1,
  },
];

const baseArea = {
  aliases: [] as string[],
  labels: [] as string[],
  picture: null,
  temperature_entity_id: null,
  humidity_entity_id: null,
  created_at: 0,
  modified_at: 0,
};

export const demoAreas: AreaRegistryEntry[] = [
  {
    ...baseArea,
    area_id: "living_room",
    name: "Living room",
    floor_id: "ground",
    icon: "mdi:sofa",
    temperature_entity_id: "sensor.living_room_temperature",
    humidity_entity_id: "sensor.living_room_humidity",
  },
  {
    ...baseArea,
    area_id: "kitchen",
    name: "Kitchen",
    floor_id: "ground",
    icon: "mdi:fridge",
    temperature_entity_id: "sensor.kitchen_temperature",
    humidity_entity_id: "sensor.kitchen_humidity",
  },
  {
    ...baseArea,
    area_id: "entrance",
    name: "Entrance",
    floor_id: "ground",
    icon: "mdi:door",
  },
  {
    ...baseArea,
    area_id: "utility_room",
    name: "Utility room",
    floor_id: "ground",
    icon: "mdi:washing-machine",
  },
  {
    ...baseArea,
    area_id: "bedroom",
    name: "Bedroom",
    floor_id: "upstairs",
    icon: "mdi:bed",
    temperature_entity_id: "sensor.bedroom_temperature",
    humidity_entity_id: "sensor.bedroom_humidity",
  },
  {
    ...baseArea,
    area_id: "office",
    name: "Office",
    floor_id: "upstairs",
    icon: "mdi:desk",
    temperature_entity_id: "sensor.office_temperature",
    humidity_entity_id: "sensor.office_humidity",
  },
  {
    ...baseArea,
    area_id: "garden",
    name: "Garden",
    floor_id: null,
    icon: "mdi:tree",
    temperature_entity_id: "sensor.garden_temperature",
    humidity_entity_id: "sensor.garden_humidity",
  },
];
