import cn from "classnames";

export enum Side {
  LEFT,
  RIGHT,
}

export interface IUIMessage {
  _id: string;
  message: string;
  time: string;
  side: Side;
  createdAt: Date;
}

const Message = ({ message, time, side }: IUIMessage) => {
  const isLeft = side === Side.LEFT;

  const Avatar = (
    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
  );
  return (
    <div
      className={cn("flex w-full mt-2 space-x-3 max-w-xs", {
        ["ml-auto justify-end"]: !isLeft,
      })}
    >
      {isLeft && Avatar}
      <div>
        <div
          className={cn("p-3", {
            ["bg-gray-300 rounded-r-lg rounded-bl-lg"]: isLeft,
            ["bg-blue-600 text-white rounded-l-lg rounded-br-lg"]: !isLeft,
          })}
        >
          <p className="text-sm">{message}</p>
        </div>
        <span className="text-xs text-gray-500 leading-none">{time}</span>
      </div>
      {!isLeft && Avatar}
    </div>
  );
};

export default Message;
