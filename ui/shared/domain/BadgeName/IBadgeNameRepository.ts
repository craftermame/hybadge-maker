import type { BadgeName } from "./BadgeName";

export interface IBadgeNameRepository {
  findAll(sourceId: string): Promise<BadgeName[]>;
};
