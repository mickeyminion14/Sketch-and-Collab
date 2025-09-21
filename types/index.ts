import { Doc, TableNames } from "../convex/_generated/dataModel";
import type { WithoutSystemFields } from "convex/server";

export type GetTypeWithoutSystemFields<T extends TableNames> =
  WithoutSystemFields<Doc<T>>;
export type GetTypeWithSystemFields<T extends TableNames> = Doc<T>;
