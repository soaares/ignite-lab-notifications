import { Module } from "@nestjs/common";
import { SendNotification } from "@domain/use-cases/send-notification";
import { DatabaseModule } from "../database/database.module";
import { NotificationsController } from "./controllers/notifications.controller";
import { CancelNotification } from "@domain/use-cases/cancel-notification";
import { GetRecipientNotifications } from "@domain/use-cases/get-recipient-notifications";
import { CountRecipientNotifications } from "@domain/use-cases/count-recipient-notifications";
import { ReadNotification } from "@domain/use-cases/read-notification";
import { UnreadNotification } from "@domain/use-cases/unread-notification";

@Module({
    imports: [DatabaseModule],
    controllers: [NotificationsController],
    providers: [
        SendNotification,
        CancelNotification,
        GetRecipientNotifications,
        CountRecipientNotifications,
        ReadNotification,
        UnreadNotification
    ]
})

export class HttpModule { }