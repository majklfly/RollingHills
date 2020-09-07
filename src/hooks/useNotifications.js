import React, { useState, useCallback, useEffect } from "react";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";

import useQuoteGenerator from "../hooks/useQuoteGenerator";

const useNotifications = async () => {
  const [message, setMessage] = useState("");
  const [quote] = useQuoteGenerator();

  useEffect(() => {
    if (quote) {
      Notifications.setNotificationHandler({
        handleNotification: async () => {
          return {
            shouldShowAlert: true,
            shouldPlaySound: false,
            shouldSetBadge: false,
          };
        },
      });
      Notifications.scheduleNotificationAsync({
        content: quote,
        trigger: {
          seconds: 5,
        },
      });
    }
  }, [quote]);

  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }
  if (finalStatus !== "granted") {
    return false;
  }

  return [message];
};

export default useNotifications;
