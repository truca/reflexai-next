import { IMessage } from "../database/models/Messages";
import { IUIMessage, Side } from "../pages/chat/Message";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export const mapBackendMessageToMessage = (
  backendMessage: IMessage
): IUIMessage => {
  return {
    _id: backendMessage._id,
    time: dayjs(backendMessage.createdAt).fromNow(),
    side: backendMessage.from === "user" ? Side.RIGHT : Side.LEFT,
    message: backendMessage.message,
    createdAt: backendMessage.createdAt,
  };
};
