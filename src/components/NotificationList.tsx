import React from "react";

import { useNotifications } from "../contexts/NotificationContext";

export const NotificationList: React.FC =
  () => {
    const {
      notifications,
      markAsRead,
    } = useNotifications();

    return (
      <div className="bg-[#0F2438] border border-white/10 rounded-3xl p-6 w-full max-w-md">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">

          <h2 className="text-2xl font-bold text-white">
            Notifications
          </h2>

          <span className="bg-green-400/20 text-green-400 px-3 py-1 rounded-xl text-sm font-semibold">
            {
              notifications.filter(
                (n) => !n.read
              ).length
            }
          </span>

        </div>

        {/* Empty */}
        {notifications.length ===
        0 ? (

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-gray-400 text-center">
            No notifications
          </div>

        ) : (

          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">

            {notifications.map(
              (notif) => (

                <div
                  key={notif.id}
                  onClick={() =>
                    markAsRead(
                      notif.id
                    )
                  }
                  className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300
                  ${
                    notif.read
                      ? "bg-white/5 border-white/10 opacity-70"
                      : "bg-green-400/10 border-green-400/30"
                  }`}
                >

                  <div className="flex items-start justify-between gap-4">

                    <div>

                      <p
                        className={`leading-7
                        ${
                          notif.read
                            ? "text-gray-300"
                            : "text-white font-semibold"
                        }`}
                      >
                        {
                          notif.message
                        }
                      </p>

                      <p className="text-xs text-gray-500 mt-3">
                        {notif.createdAt
                          ?.toDate()
                          ?.toLocaleString()}
                      </p>

                    </div>

                    {!notif.read && (

                      <div className="w-3 h-3 rounded-full bg-green-400 mt-2"></div>

                    )}

                  </div>

                </div>

              )
            )}

          </div>

        )}

      </div>
    );
  };