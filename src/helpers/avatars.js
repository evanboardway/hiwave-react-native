import { AVATAR_BIKE, AVATAR_MOPED, AVATAR_MOTORCYCLE, AVATAR_PIGGY, AVATAR_SCOOTER, AVATAR_SNOWMOBILE } from "./enums"

export const IMAGE_BIKE = require("../assets/images/bike.png")
export const IMAGE_SNOWMOBILE = require("../assets/images/snowmobile.png")
export const IMAGE_MOTORCYCLE = require("../assets/images/motorcycle.png")
export const IMAGE_SCOOTER = require("../assets/images/scooter.png")
export const IMAGE_MOPED = require("../assets/images/moped.png")
export const IMAGE_PIGGY = require("../assets/images/piggy.png")

export function AvatarToImage(avatar) {
    switch(avatar) {
        case AVATAR_BIKE:
            return IMAGE_BIKE
        case AVATAR_MOPED:
            return IMAGE_MOPED
        case AVATAR_MOTORCYCLE:
            return IMAGE_MOTORCYCLE
        case AVATAR_PIGGY:
            return IMAGE_PIGGY
        case AVATAR_SCOOTER:
            return IMAGE_SCOOTER
        case AVATAR_SNOWMOBILE:
            return IMAGE_SNOWMOBILE
        default:
            return IMAGE_BIKE
    }
}
