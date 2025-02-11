import { getNotifications } from "@/app/services";
import { NotificationsUi } from "./NotificationsUi";

export async function NotificationsWrapper() {
  const { notifications, pagination } = await getNotifications();
  return (
    <NotificationsUi notifications={notifications} pagination={pagination} />
  );
}
