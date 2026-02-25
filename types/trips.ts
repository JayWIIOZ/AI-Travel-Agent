import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import * as schema from "@/db/schema";

/** 将指定键变为可选项（属性可省略） */
type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// 基础表类型
export type User = InferSelectModel<typeof schema.users>;
/** Trip：description、日期、目的地等为可选项 */
export type Trip = WithOptional<
  InferSelectModel<typeof schema.trips>,
  "description" | "startDate" | "endDate" | "destination"
>;
export type TripMember = InferSelectModel<typeof schema.tripMembers>;
export type TripModuleBase = InferSelectModel<typeof schema.tripModules>;

// 用于创建/表单的类型（自动处理 default 值字段）
export type NewTrip = InferInsertModel<typeof schema.trips>;
export type NewTripModule = InferInsertModel<typeof schema.tripModules>;

// 定义各种模块特有的元数据
export interface FlightMetadata {
  flightNumber: string;
  airline: string;
  confirmationNumber?: string;
  seatNumber?: string;
  terminal?: string;
}

export interface HotelMetadata {
  confirmationNumber: string;
  checkInInstruction?: string;
  phoneNumber?: string;
  bookingUrl?: string;
}

export interface DiningMetadata {
  reservationTime?: string;
  cuisineType?: string;
  phoneNumber?: string;
  menuUrl?: string;
}

export interface ActivityMetadata {
  ticketPrice?: number;
  bookingUrl?: string;
  bookingReference?: string;
}

// 辨析联合类型：这是前端最核心的类型，决定了你写 UI 时的智能补全
export type TripModuleMetadata =
  | ({ type: "flight" } & FlightMetadata)
  | ({ type: "hotel" } & HotelMetadata)
  | ({ type: "dining" } & DiningMetadata)
  | ({ type: "activity" | "transport" } & ActivityMetadata);

// 最终增强型的 Module 类型
export type TripModule = Omit<TripModuleBase, "metadata"> & {
  metadata: TripModuleMetadata;
};

// 完整行程单：包含所有模块和成员信息
export type TripWithDetails = Trip & {
  modules: TripModule[];
  members: (TripMember & { user: User })[];
  _count?: {
    modules: number;
    members: number;
  };
};

// 列表页使用的轻量化行程
export type TripListItem = Pick<
  Trip,
  "id" | "title" | "startDate" | "endDate" | "destination" | "status"
> & {
  memberCount: number;
  coverImage?: string; // 可以在 metadata 或单独字段中定义
};

/** 行程模块类型枚举值（从 tripModules.type 推断） */
export type ModuleType = InferSelectModel<typeof schema.tripModules>["type"];