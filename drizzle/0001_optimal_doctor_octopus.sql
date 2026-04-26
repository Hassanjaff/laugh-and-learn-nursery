CREATE TABLE `files` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`filename` varchar(255) NOT NULL,
	`fileKey` varchar(512) NOT NULL,
	`fileUrl` text NOT NULL,
	`mimeType` varchar(100) NOT NULL,
	`fileSize` int NOT NULL,
	`category` varchar(50) NOT NULL DEFAULT 'general',
	`description` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `files_id` PRIMARY KEY(`id`),
	CONSTRAINT `files_fileKey_unique` UNIQUE(`fileKey`)
);
