import { Replace } from 'src/helpers/Replace';
import { Content } from './content';
import { randomUUID } from "crypto";

export interface NotificationProps {
    recipientId: string;
    content: Content;
    category: string;
    readAt?: Date | null;
    canceledAt?: Date;
    createdAt: Date;
}

export class Notification {
    private _id: string

    constructor(
        private props: Replace<NotificationProps, { createdAt?: Date }>,
    ) {
        this._id = randomUUID()
        this.props = {
            ...props,
            createdAt: props.createdAt ?? new Date()
        }
    }

    public get id(): string {
        return this._id
    }

    public get recipientId(): string {
        return this.props.recipientId;
    }

    public set recipientId(recipientId: string) {
        this.props.recipientId = recipientId;
    }

    public get content(): Content {
        return this.props.content;
    }

    public set content(content: Content) {
        this.props.content = content;
    }

    public get category(): string {
        return this.props.category;
    }

    public set category(category: string) {
        this.props.category = category;
    }

    public cancel() {
        this.props.canceledAt = new Date();
    }

    public get canceledAt(): Date | null | undefined {
        return this.props.canceledAt;
    }

    public get readAt(): Date | null | undefined {
        return this.props.readAt;

    }

    public set readAt(readAt: Date | null | undefined) {
        this.props.readAt = readAt;
    }

    public get createdAt(): Date | undefined {
        return this.props.createdAt;
    }
}