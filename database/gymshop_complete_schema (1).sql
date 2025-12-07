-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: gymsinhvien
-- ------------------------------------------------------
-- Server version	9.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin_activity_logs`
--

DROP TABLE IF EXISTS `admin_activity_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin_activity_logs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `action` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'create_product, update_order, delete_user',
  `entity_type` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'product, order, user',
  `entity_id` int DEFAULT NULL,
  `details` json DEFAULT NULL COMMENT 'Chi tiết thay đổi',
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_user` (`user_id`),
  KEY `idx_action` (`action`),
  KEY `idx_entity` (`entity_type`,`entity_id`),
  KEY `idx_created` (`created_at`),
  CONSTRAINT `admin_activity_logs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `admins` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=84 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_activity_logs`
--

LOCK TABLES `admin_activity_logs` WRITE;
/*!40000 ALTER TABLE `admin_activity_logs` DISABLE KEYS */;
INSERT INTO `admin_activity_logs` VALUES (1,NULL,'create_product','product',1,'{\"name\": \"Gold Standard Whey\"}','192.168.1.1','Mozilla/5.0','2024-12-31 17:00:00'),(2,NULL,'update_order','order',1,'{\"status\": \"confirmed\"}','192.168.1.2','Mozilla/5.0','2025-10-01 04:00:00'),(3,NULL,'delete_user','user',11,'{\"username\": \"tempuser\"}','192.168.1.3','Mozilla/5.0','2025-01-01 17:00:00'),(4,NULL,'manage_inventory','inventory',1,'{\"quantity\": 100}','192.168.1.4','Mozilla/5.0','2025-10-04 06:00:00'),(5,NULL,'view_reports','report',NULL,'{\"type\": \"sales\"}','192.168.1.5','Mozilla/5.0','2025-10-05 07:00:00'),(6,NULL,'create_discount','discount',1,'{\"code\": \"SAVE10\"}','192.168.1.6','Mozilla/5.0','2024-12-31 17:00:00'),(7,NULL,'update_product','product',2,'{\"price\": 1400000}','192.168.1.7','Mozilla/5.0','2025-01-01 17:00:00'),(8,NULL,'manage_users','user',1,'{\"role\": \"admin\"}','192.168.1.8','Mozilla/5.0','2025-10-07 09:00:00'),(9,NULL,'login','system',NULL,NULL,'192.168.1.9','Mozilla/5.0','2025-10-08 10:00:00'),(10,NULL,'export_data','report',NULL,'{\"type\": \"orders\"}','192.168.1.10','Mozilla/5.0','2025-10-09 11:00:00'),(20,1,'CREATE_ADMIN','admin',9,'{\"role\": \"admin\", \"email\": \"dong@gmail.com\"}','127.0.0.1','PostmanRuntime/7.49.1','2025-11-22 20:43:18'),(21,1,'LOGIN','admin',1,'{\"role\": \"super_admin\", \"email\": \"superadmin@example.com\"}','127.0.0.1','node','2025-11-22 20:46:33'),(22,1,'LOGIN','admin',1,'{\"role\": \"super_admin\", \"email\": \"superadmin@example.com\"}','127.0.0.1','node','2025-11-22 20:46:44'),(23,1,'LOGIN','admin',1,'{\"role\": \"super_admin\", \"email\": \"superadmin@example.com\"}','127.0.0.1','node','2025-11-22 20:46:52'),(24,1,'LOGIN','admin',1,'{\"role\": \"super_admin\", \"email\": \"superadmin@example.com\"}','127.0.0.1','node','2025-11-22 20:47:43'),(25,1,'LOGIN','admin',1,'{\"role\": \"super_admin\", \"email\": \"superadmin@example.com\"}','127.0.0.1','node','2025-11-22 20:47:48'),(26,1,'LOGIN','admin',1,'{\"role\": \"super_admin\", \"email\": \"superadmin@example.com\"}','127.0.0.1','node','2025-11-22 20:47:56'),(27,1,'LOGIN','admin',1,'{\"role\": \"super_admin\", \"email\": \"superadmin@example.com\"}','127.0.0.1','PostmanRuntime/7.49.1','2025-11-22 20:51:13'),(28,1,'LOGIN','admin',1,'{\"role\": \"super_admin\", \"email\": \"superadmin@example.com\"}','127.0.0.1','node','2025-11-22 20:51:52'),(29,1,'UPDATE_ADMIN_STATUS','admin',9,'{\"email\": \"dong@gmail.com\", \"new_status\": 0, \"old_status\": 1}','127.0.0.1','node','2025-11-22 20:51:53'),(30,1,'UPDATE_ADMIN_STATUS','admin',9,'{\"email\": \"dong@gmail.com\", \"new_status\": 1, \"old_status\": 0}','127.0.0.1','node','2025-11-22 20:51:56'),(31,1,'LOGIN','admin',1,'{\"role\": \"super_admin\", \"email\": \"superadmin@example.com\"}','127.0.0.1','node','2025-11-22 20:52:08'),(32,1,'LOGIN','admin',1,'{\"role\": \"super_admin\", \"email\": \"superadmin@example.com\"}','127.0.0.1','node','2025-11-22 20:52:24'),(33,1,'LOGIN','admin',1,'{\"role\": \"super_admin\", \"email\": \"superadmin@example.com\"}','127.0.0.1','PostmanRuntime/7.49.1','2025-11-23 23:30:30'),(34,1,'UPDATE_ADMIN_STATUS','admin',2,'{\"email\": \"admin1@example.com\", \"new_status\": 1, \"old_status\": 1}','127.0.0.1','PostmanRuntime/7.49.1','2025-11-23 23:44:47'),(35,1,'UPDATE_ADMIN_STATUS','admin',3,'{\"email\": \"manager1@example.com\", \"new_status\": 1, \"old_status\": 1}','127.0.0.1','PostmanRuntime/7.49.1','2025-11-23 23:45:21'),(36,1,'UPDATE_ADMIN_STATUS','admin',4,'{\"email\": \"admin2@example.com\", \"new_status\": 1, \"old_status\": 0}','127.0.0.1','PostmanRuntime/7.49.1','2025-11-23 23:45:26'),(37,1,'UPDATE_ADMIN_STATUS','admin',2,'{\"email\": \"admin1@example.com\", \"new_status\": 1, \"old_status\": 1}','127.0.0.1','PostmanRuntime/7.49.1','2025-11-23 23:45:34'),(38,1,'CREATE_ADMIN','admin',10,'{\"role\": \"admin\", \"email\": \"dongv@gmail.com\"}','127.0.0.1','PostmanRuntime/7.49.1','2025-11-23 23:45:51'),(39,1,'UPDATE_ADMIN_STATUS','admin',10,'{\"email\": \"dongv@gmail.com\", \"new_status\": 1, \"old_status\": 1}','127.0.0.1','PostmanRuntime/7.49.1','2025-11-23 23:46:06'),(40,1,'LOGIN','admin',1,'{\"role\": \"super_admin\", \"email\": \"superadmin@example.com\"}','127.0.0.1','PostmanRuntime/7.49.1','2025-11-23 23:58:45'),(41,1,'DELETE_ADMIN','admin',3,'{\"role\": \"manager\", \"email\": \"manager1@example.com\"}','127.0.0.1','PostmanRuntime/7.49.1','2025-11-24 00:18:39'),(42,1,'LOGIN','admin',1,'{\"role\": \"super_admin\", \"email\": \"superadmin@example.com\"}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36 Edg/142.0.0.0','2025-11-24 00:32:18'),(43,1,'UPDATE_ADMIN_STATUS','admin',10,'{\"email\": \"dongv@gmail.com\", \"new_status\": 0, \"old_status\": 1}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36 Edg/142.0.0.0','2025-11-24 00:32:23'),(44,1,'UPDATE_ADMIN_STATUS','admin',9,'{\"email\": \"dong@gmail.com\", \"new_status\": 0, \"old_status\": 1}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36 Edg/142.0.0.0','2025-11-24 00:32:24'),(45,1,'UPDATE_ADMIN_STATUS','admin',8,'{\"email\": \"testadmin1@example.com\", \"new_status\": 0, \"old_status\": 1}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36 Edg/142.0.0.0','2025-11-24 00:32:25'),(46,1,'UPDATE_ADMIN_STATUS','admin',2,'{\"email\": \"admin1@example.com\", \"new_status\": 0, \"old_status\": 1}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36 Edg/142.0.0.0','2025-11-24 00:32:26'),(47,1,'UPDATE_ADMIN_STATUS','admin',4,'{\"email\": \"admin2@example.com\", \"new_status\": 0, \"old_status\": 1}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36 Edg/142.0.0.0','2025-11-24 00:32:26'),(48,1,'UPDATE_ADMIN_STATUS','admin',4,'{\"email\": \"admin2@example.com\", \"new_status\": 1, \"old_status\": 0}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36 Edg/142.0.0.0','2025-11-24 00:32:27'),(49,1,'UPDATE_ADMIN_STATUS','admin',4,'{\"email\": \"admin2@example.com\", \"new_status\": 0, \"old_status\": 1}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36 Edg/142.0.0.0','2025-11-24 00:32:28'),(50,1,'UPDATE_ADMIN_STATUS','admin',8,'{\"email\": \"testadmin1@example.com\", \"new_status\": 1, \"old_status\": 0}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36 Edg/142.0.0.0','2025-11-24 00:32:29'),(51,1,'UPDATE_ADMIN_STATUS','admin',2,'{\"email\": \"admin1@example.com\", \"new_status\": 1, \"old_status\": 0}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36 Edg/142.0.0.0','2025-11-24 00:32:30'),(52,1,'UPDATE_ADMIN_STATUS','admin',9,'{\"email\": \"dong@gmail.com\", \"new_status\": 1, \"old_status\": 0}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36 Edg/142.0.0.0','2025-11-24 00:32:31'),(53,1,'UPDATE_ADMIN_STATUS','admin',10,'{\"email\": \"dongv@gmail.com\", \"new_status\": 1, \"old_status\": 0}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36 Edg/142.0.0.0','2025-11-24 00:32:33'),(54,1,'UPDATE_ADMIN_STATUS','admin',4,'{\"email\": \"admin2@example.com\", \"new_status\": 1, \"old_status\": 0}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36 Edg/142.0.0.0','2025-11-24 00:32:34'),(55,1,'LOGIN','admin',1,'{\"role\": \"super_admin\", \"email\": \"superadmin@example.com\"}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36 Edg/142.0.0.0','2025-11-24 00:42:39'),(56,1,'CREATE_ADMIN','admin',11,'{\"role\": \"admin\", \"email\": \"dongbeo123@gmail.com\"}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36 Edg/142.0.0.0','2025-11-24 00:43:14'),(57,1,'LOGIN','admin',1,'{\"role\": \"super_admin\", \"email\": \"superadmin@example.com\"}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36 Edg/142.0.0.0','2025-11-24 01:12:52'),(58,1,'LOGIN','admin',1,'{\"role\": \"super_admin\", \"email\": \"superadmin@example.com\"}','127.0.0.1','PostmanRuntime/7.49.1','2025-11-24 01:14:26'),(59,1,'LOGIN','admin',1,'{\"role\": \"super_admin\", \"email\": \"superadmin@example.com\"}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36 Edg/142.0.0.0','2025-11-24 01:27:01'),(60,1,'LOGIN','admin',1,'{\"role\": \"super_admin\", \"email\": \"superadmin@example.com\"}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36 Edg/142.0.0.0','2025-11-24 01:27:47'),(61,1,'LOGIN','admin',1,'{\"role\": \"super_admin\", \"email\": \"superadmin@example.com\"}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36 Edg/142.0.0.0','2025-11-24 01:34:20'),(62,1,'LOGIN','admin',1,'{\"role\": \"super_admin\", \"email\": \"superadmin@example.com\"}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36 Edg/142.0.0.0','2025-11-24 01:46:26'),(63,1,'LOGIN','admin',1,'{\"role\": \"super_admin\", \"email\": \"superadmin@example.com\"}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36 Edg/142.0.0.0','2025-11-24 01:47:57'),(64,1,'LOGIN','admin',1,'{\"role\": \"super_admin\", \"email\": \"superadmin@example.com\"}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36 Edg/142.0.0.0','2025-11-24 01:51:55'),(65,1,'LOGIN','admin',1,'{\"role\": \"super_admin\", \"email\": \"superadmin@example.com\"}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36 Edg/142.0.0.0','2025-11-24 01:54:05'),(66,1,'LOGIN','admin',1,'{\"role\": \"super_admin\", \"email\": \"superadmin@example.com\"}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36 Edg/142.0.0.0','2025-11-24 01:55:33'),(67,1,'LOGIN','admin',1,'{\"role\": \"super_admin\", \"email\": \"superadmin@example.com\"}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36 Edg/142.0.0.0','2025-11-24 01:56:12'),(68,1,'LOGIN','admin',1,'{\"role\": \"super_admin\", \"email\": \"superadmin@example.com\"}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36 Edg/142.0.0.0','2025-11-24 02:00:18'),(69,1,'LOGIN','admin',1,'{\"role\": \"super_admin\", \"email\": \"superadmin@example.com\"}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36 Edg/142.0.0.0','2025-11-24 02:02:05'),(70,1,'LOGIN','admin',1,'{\"role\": \"super_admin\", \"email\": \"superadmin@example.com\", \"with2FA\": true}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36 Edg/142.0.0.0','2025-11-24 02:12:01'),(71,1,'LOGIN','admin',1,'{\"role\": \"super_admin\", \"email\": \"superadmin@example.com\", \"with2FA\": true}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36 Edg/142.0.0.0','2025-11-24 02:14:50'),(72,1,'UPDATE_ADMIN_STATUS','admin',11,'{\"email\": \"dongbeo123@gmail.com\", \"new_status\": 0, \"old_status\": 1}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36 Edg/142.0.0.0','2025-11-24 02:26:34'),(73,1,'UPDATE_ADMIN_STATUS','admin',10,'{\"email\": \"dongv@gmail.com\", \"new_status\": 0, \"old_status\": 1}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36 Edg/142.0.0.0','2025-11-24 02:26:35'),(74,1,'UPDATE_ADMIN_STATUS','admin',9,'{\"email\": \"dong@gmail.com\", \"new_status\": 0, \"old_status\": 1}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36 Edg/142.0.0.0','2025-11-24 02:26:36'),(75,1,'UPDATE_ADMIN_STATUS','admin',2,'{\"email\": \"admin1@example.com\", \"new_status\": 0, \"old_status\": 1}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36 Edg/142.0.0.0','2025-11-24 02:26:37'),(76,1,'UPDATE_ADMIN_STATUS','admin',4,'{\"email\": \"admin2@example.com\", \"new_status\": 0, \"old_status\": 1}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36 Edg/142.0.0.0','2025-11-24 02:26:38'),(77,1,'UPDATE_ADMIN_STATUS','admin',8,'{\"email\": \"testadmin1@example.com\", \"new_status\": 0, \"old_status\": 1}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36 Edg/142.0.0.0','2025-11-24 02:26:39'),(78,1,'UPDATE_ADMIN_STATUS','admin',4,'{\"email\": \"admin2@example.com\", \"new_status\": 1, \"old_status\": 0}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36 Edg/142.0.0.0','2025-11-24 02:26:42'),(79,1,'UPDATE_ADMIN_STATUS','admin',2,'{\"email\": \"admin1@example.com\", \"new_status\": 1, \"old_status\": 0}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36 Edg/142.0.0.0','2025-11-24 02:26:43'),(80,1,'UPDATE_ADMIN_STATUS','admin',9,'{\"email\": \"dong@gmail.com\", \"new_status\": 1, \"old_status\": 0}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36 Edg/142.0.0.0','2025-11-24 02:26:44'),(81,1,'UPDATE_ADMIN_STATUS','admin',8,'{\"email\": \"testadmin1@example.com\", \"new_status\": 1, \"old_status\": 0}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36 Edg/142.0.0.0','2025-11-24 02:26:44'),(82,1,'UPDATE_ADMIN_STATUS','admin',10,'{\"email\": \"dongv@gmail.com\", \"new_status\": 1, \"old_status\": 0}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36 Edg/142.0.0.0','2025-11-24 02:26:45'),(83,1,'UPDATE_ADMIN_STATUS','admin',11,'{\"email\": \"dongbeo123@gmail.com\", \"new_status\": 1, \"old_status\": 0}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36 Edg/142.0.0.0','2025-11-24 02:26:46');
/*!40000 ALTER TABLE `admin_activity_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admin_roles`
--

DROP TABLE IF EXISTS `admin_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin_roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `permissions` json DEFAULT NULL COMMENT 'Ví dụ: ["manage_users", "manage_products", "view_reports"]',
  `description` text COLLATE utf8mb4_unicode_ci,
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `role_name` (`role_name`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_roles`
--

LOCK TABLES `admin_roles` WRITE;
/*!40000 ALTER TABLE `admin_roles` DISABLE KEYS */;
INSERT INTO `admin_roles` VALUES (1,'Super Admin','[\"*\"]','Toàn quyền hệ thống',1,'2025-10-11 02:09:04','2025-10-11 02:09:04'),(2,'Admin','[\"manage_products\", \"manage_orders\", \"manage_users\", \"view_reports\"]','Quản trị viên',1,'2025-10-11 02:09:04','2025-10-11 02:09:04'),(3,'Staff','[\"manage_orders\", \"manage_inventory\", \"customer_support\"]','Nhân viên',1,'2025-10-11 02:09:04','2025-10-11 02:09:04'),(4,'Marketing','[\"manage_promotions\", \"manage_content\", \"view_analytics\"]','Marketing',1,'2025-10-11 02:09:04','2025-10-11 02:09:04'),(5,'Inventory Manager','[\"manage_inventory\", \"view_reports\", \"manage_warehouses\"]','Quản lý kho hàng',1,'2025-10-11 03:09:33','2025-10-11 03:09:33'),(6,'Customer Support','[\"manage_orders\", \"customer_support\", \"view_users\"]','Hỗ trợ khách hàng',1,'2025-10-11 03:09:33','2025-10-11 03:09:33'),(7,'Content Editor','[\"manage_products\", \"manage_content\", \"manage_categories\"]','Chỉnh sửa nội dung',1,'2025-10-11 03:09:33','2025-10-11 03:09:33'),(8,'SEO Specialist','[\"manage_seo\", \"view_analytics\", \"manage_banners\"]','Chuyên viên SEO',1,'2025-10-11 03:09:33','2025-10-11 03:09:33'),(9,'Finance Admin','[\"view_reports\", \"manage_payments\", \"manage_refunds\"]','Quản lý tài chính',1,'2025-10-11 03:09:33','2025-10-11 03:09:33'),(10,'Developer','[\"manage_system\", \"view_logs\", \"manage_settings\"]','Nhà phát triển',1,'2025-10-11 03:09:33','2025-10-11 03:09:33');
/*!40000 ALTER TABLE `admin_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admins` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `full_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT 'admin',
  `is_active` tinyint DEFAULT '1',
  `secret_2fa` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_2fa_enabled` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
INSERT INTO `admins` VALUES (1,'superadmin@example.com','$2a$10$naVO5vJDKbuF8vXK8iEzjeSgYwaXjR6YGCjcMN2MM0n0WfXhwMRSC','Super Administrator',NULL,'super_admin',1,'GRNSQ42QEF5FK4SCKNJGISDPEZQSKRBRGATEESKFEZFEE7KVKVUA',1,'2025-11-22 19:24:31','2025-11-24 02:21:03'),(2,'admin1@example.com','$2a$10$fRvGKS25RKxRXxHISO7kEeWFMVVH23.kmO58fxhqoduevJpxwoF4S','Nguyễn Văn Admin','0999888088','admin',1,NULL,0,'2025-11-22 20:07:32','2025-11-24 02:26:43'),(4,'admin2@example.com','$2a$10$fRvGKS25RKxRXxHISO7kEeWFMVVH23.kmO58fxhqoduevJpxwoF4S','Lê Văn Test','0111222333','admin',1,NULL,0,'2025-11-22 20:07:32','2025-11-24 02:26:42'),(8,'testadmin1@example.com','$2a$10$Ct3pTzGNrLBM89mW4uN8kediwu2nX4HEbRWlcTltwO5h85xoXpJDO','Test Admin 1','0123456789','admin',1,NULL,0,'2025-11-22 20:34:42','2025-11-24 02:26:44'),(9,'dong@gmail.com','$2a$10$M44EHKeCadLnbPvVFhIUuus9tUepfUc/LsDMOcAECzujT7jyLefim','Test Admin 1','0123456789','admin',1,NULL,0,'2025-11-22 20:43:18','2025-11-24 02:26:44'),(10,'dongv@gmail.com','$2a$10$zH.DqSxFcFry6OMD98r/Ce.MMFuPIQc9mh87bylj5w9Q4B8b739ba','Test Admin 1','0123456789','admin',1,NULL,0,'2025-11-23 23:45:51','2025-11-24 02:26:45'),(11,'dongbeo123@gmail.com','$2a$10$yBXF.IZlhPSC.VugfL7C/.MXMOmb/czm9G8HxnK4Cpig7Q/7v8T96','dongkhongbeo','0123455236','admin',1,NULL,0,'2025-11-24 00:43:14','2025-11-24 02:27:27');
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `banners`
--

DROP TABLE IF EXISTS `banners`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `banners` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image_url` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image_mobile_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Hình cho mobile',
  `link_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `link_target` enum('_self','_blank') COLLATE utf8mb4_unicode_ci DEFAULT '_self',
  `position` enum('homepage_hero','homepage_middle','category_top','product_sidebar') COLLATE utf8mb4_unicode_ci NOT NULL,
  `sort_order` int DEFAULT '0',
  `start_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `end_date` timestamp NULL DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `created_by` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `created_by` (`created_by`),
  KEY `idx_position` (`position`,`is_active`),
  KEY `idx_dates` (`start_date`,`end_date`),
  CONSTRAINT `banners_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `banners`
--

LOCK TABLES `banners` WRITE;
/*!40000 ALTER TABLE `banners` DISABLE KEYS */;
INSERT INTO `banners` VALUES (1,'tháng 9 deal hời','/uploads/banners/banner-1763952101746-531151086.jpg','/images/banner-hero1-mobile.jpg','http://localhost:8080/category/1','_self','homepage_hero',1,'2024-12-31 17:00:00','2025-12-30 17:00:00',0,NULL,'2025-10-11 03:28:23','2025-11-24 02:41:42'),(2,'tháng 9 deal hời','/uploads/banners/banner-1761061882549-743978578.png',NULL,'http://localhost:8080/category/2','_self','homepage_middle',1,'2024-12-31 17:00:00',NULL,1,NULL,'2025-10-11 03:28:23','2025-11-24 02:40:41'),(3,'tháng 9 deal hời','/uploads/banners/banner-1761061971003-10369198.png','/images/banner-sale-mobile.jpg','/flash-sales','_blank','category_top',1,'2025-09-30 17:00:00','2025-10-07 16:59:59',1,NULL,'2025-10-11 03:28:23','2025-10-21 15:52:51'),(4,'tháng 9 deal hời','/uploads/banners/banner-1761061983249-712487464.png',NULL,'/vitamins-minerals','_self','product_sidebar',1,'2024-12-31 17:00:00',NULL,1,NULL,'2025-10-11 03:28:23','2025-10-21 15:53:03'),(5,'tháng 9 deal hời','/uploads/banners/banner-1761062085818-863810012.png','/images/banner-hero2-mobile.jpg','http://localhost:8080/category/2','_self','homepage_hero',2,'2024-12-31 17:00:00','2025-12-30 17:00:00',1,NULL,'2025-10-11 03:28:23','2025-11-24 02:40:31'),(6,'tháng 9 deal hời','/uploads/banners/banner-1761027679087-856016906.png',NULL,'/pre-workout','_self','homepage_middle',2,'2024-12-31 17:00:00',NULL,1,NULL,'2025-10-11 03:28:23','2025-10-21 06:21:19'),(7,'tháng 9 deal hời','/uploads/banners/banner-1761027682722-800315523.png','/images/banner-flash-mobile.jpg','/flash-sales/1','_blank','category_top',2,'2025-09-30 17:00:00','2025-10-03 16:59:59',1,NULL,'2025-10-11 03:28:23','2025-10-21 06:21:23'),(8,'tháng 9 deal hời','/uploads/banners/banner-1761027685773-278777875.png',NULL,'http://localhost:8080/category/2','_self','product_sidebar',2,'2024-12-31 17:00:00',NULL,0,NULL,'2025-10-11 03:28:23','2025-11-24 02:41:03'),(9,'tháng 9 deal hời','/uploads/banners/banner-1761027690962-891179614.png','/images/banner-summer-mobile.jpg','http://localhost:8080/category/2','_self','homepage_hero',3,'2025-05-31 17:00:00','2025-08-30 17:00:00',1,NULL,'2025-10-11 03:28:23','2025-11-24 02:40:37'),(10,'tháng 9 deal hời','/uploads/banners/banner-1761027697056-536914487.png',NULL,'http://localhost:8080/category/2','_self','homepage_middle',3,'2024-12-31 17:00:00',NULL,1,NULL,'2025-10-11 03:28:23','2025-11-24 02:40:55');
/*!40000 ALTER TABLE `banners` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blog_categories`
--

DROP TABLE IF EXISTS `blog_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blog_categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `parent_id` int DEFAULT NULL,
  `sort_order` int DEFAULT '0',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blog_categories`
--

LOCK TABLES `blog_categories` WRITE;
/*!40000 ALTER TABLE `blog_categories` DISABLE KEYS */;
INSERT INTO `blog_categories` VALUES (1,'Kiến Thức Dinh Dưỡng','kien-thuc-dinh-duong',NULL,1,'2025-11-20 12:58:23'),(2,'Kiến Thức Tập Luyện','kien-thuc-tap-luyen',NULL,2,'2025-11-20 12:58:23'),(3,'Tư Vấn Dinh Dưỡng','tu-van-dinh-duong',NULL,3,'2025-11-20 12:58:23'),(4,'Kinh Nghiệm Tập Gym','kinh-nghiem-tap-gym',NULL,4,'2025-11-20 12:58:23');
/*!40000 ALTER TABLE `blog_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blog_posts`
--

DROP TABLE IF EXISTS `blog_posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blog_posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category_id` int DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `thumbnail` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `content` longtext COLLATE utf8mb4_unicode_ci,
  `author` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `views` int DEFAULT '0',
  `is_featured` tinyint DEFAULT '0',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `blog_posts_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `blog_categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blog_posts`
--

LOCK TABLES `blog_posts` WRITE;
/*!40000 ALTER TABLE `blog_posts` DISABLE KEYS */;
INSERT INTO `blog_posts` VALUES (1,1,'7 Nguyên tắc dinh dưỡng giúp bạn tăng cơ nhanh','7-nguyen-tac-dinh-duong-tang-co','/uploads/2fc388c12d1025410b77914dadb11e7b610.jpg','Nội dung bài viết về dinh dưỡng tăng cơ...','Admin',121,1,'2025-11-20 13:08:10','2025-11-24 09:37:21'),(2,1,'Danh sách thực phẩm bổ sung Protein tự nhiên','thuc-pham-giau-protein','/uploads/b62b6a54db47314c25e2c1891610e07b1.jpg','Danh sách những thực phẩm giàu protein...','Admin',81,1,'2025-11-20 13:08:10','2025-11-24 09:38:15'),(3,2,'5 Bài tập ngực hiệu quả cho người mới','5-bai-tap-nguc-hieu-qua','/uploads/49bb1bb82d85d0d21087098e437d7b6fa.jpg','Nội dung chi tiết các bài tập ngực...','Admin',201,1,'2025-11-20 13:08:10','2025-11-24 09:37:40'),(4,3,'Làm sao để chọn Whey Protein phù hợp?','chon-whey-protein-phu-hop','/uploads/08c98bcff5ba831081c4d7ce9985aa1d4.jpg','Bài viết tư vấn chọn whey phù hợp...','Admin',75,1,'2025-11-20 13:08:10','2025-11-24 09:37:53'),(5,4,'Những sai lầm phổ biến khi tập Gym','sai-lam-pho-bien-khi-tap-gym','/uploads/74da278c102739f001108a14ae73691311.jpg','Tổng hợp các lỗi nhiều người hay mắc...','Admin',151,0,'2025-11-20 13:08:10','2025-11-24 09:37:30');
/*!40000 ALTER TABLE `blog_posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `brands`
--

DROP TABLE IF EXISTS `brands`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `brands` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logo_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `banner_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `country` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `website` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_verified` tinyint(1) DEFAULT '0' COMMENT 'Thương hiệu chính hãng',
  `is_featured` tinyint(1) DEFAULT '0' COMMENT 'Thương hiệu nổi bật',
  `sort_order` int DEFAULT '0',
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `slug` (`slug`),
  KEY `idx_slug` (`slug`),
  KEY `idx_featured` (`is_featured`,`is_active`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brands`
--

LOCK TABLES `brands` WRITE;
/*!40000 ALTER TABLE `brands` DISABLE KEYS */;
INSERT INTO `brands` VALUES (1,'Optimum Nutrition','optimum-nutrition','/uploads/18f44cfd34b1b77871986fd6b6be110ec.png',NULL,'Thương hiệu dinh dưỡng thể thao hàng đầu thế giới','USA',NULL,1,1,0,1,'2025-10-11 02:09:04','2025-10-17 17:34:39'),(2,'Dymatize','dymatize','/uploads/91b416d8de1e8dc15da3935e1e5356d1.png',NULL,'Thương hiệu protein chất lượng cao','USA',NULL,1,0,0,1,'2025-10-11 02:09:04','2025-10-17 18:05:54'),(3,'MuscleTech','muscletech','/uploads/a2607683101e71a106022441157a9db86b.png',NULL,'Thương hiệu bổ sung dinh dưỡng thể thao','USA',NULL,1,1,0,1,'2025-10-11 02:09:04','2025-10-17 17:37:55'),(4,'BSN','bsn','/uploads/37cb9d6893cea56e92dfe4bf557abc86.png',NULL,'Bio-Engineered Supplements and Nutrition','USA',NULL,1,0,0,1,'2025-10-11 02:09:04','2025-10-17 17:38:45'),(5,'Cellucor','cellucor','/uploads/1fa48249e213f430159facd5b9410f931.png',NULL,'Thương hiệu pre-workout nổi tiếng','USA',NULL,1,1,0,1,'2025-10-11 02:09:04','2025-10-17 17:39:11'),(6,'MyProtein','myprotein','/uploads/428ad110f9f81481d9abdbcc7ec2758c4.png','/images/myprotein-banner.jpg','Thương hiệu dinh dưỡng thể thao Anh Quốc','UK','https://www.myprotein.com',1,1,4,1,'2025-10-11 03:09:33','2025-10-17 17:39:37'),(7,'Ghost Lifestyle','ghost-lifestyle','/uploads/2e722a282e6df077c020d52916d458a1.png','/images/ghost-banner.jpg','Thương hiệu supplement sáng tạo','USA','https://www.ghostlifestyle.com',1,1,5,1,'2025-10-11 03:09:33','2025-10-17 17:40:12'),(8,'Animal','animal','/uploads/f37da7995625779ea6a3a5fee3974552.png','/images/animal-banner.jpg','Thương hiệu cho người tập nặng','USA','https://www.animalpak.com',1,1,6,1,'2025-10-11 03:09:33','2025-10-17 17:40:32'),(9,'Now Foods','now-foods','/uploads/a0e23b0807ca5478debabaaf5bb10ae67.png','/images/now-banner.jpg','Thương hiệu vitamin tự nhiên','USA','https://www.nowfoods.com',1,0,7,1,'2025-10-11 03:09:33','2025-10-17 17:41:47'),(10,'Jarrow Formulas','jarrow-formulas','/uploads/e6f1085d6df7d82a2750c6b3fa598a1065.png','/images/jarrow-banner.jpg','Thương hiệu probiotic và enzyme','USA','https://www.jarrow.com',1,0,8,1,'2025-10-11 03:09:33','2025-10-17 17:43:08'),(11,'mywwhey','mywwhey','/uploads/6e98539c97854c9464810af130e1aa522.png',NULL,'đwDĐWDWqdwd','vietnam',NULL,0,0,0,0,'2025-11-18 07:01:45','2025-11-19 19:01:31');
/*!40000 ALTER TABLE `brands` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart_items`
--

DROP TABLE IF EXISTS `cart_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cart_id` int NOT NULL,
  `product_id` int NOT NULL,
  `variant_id` int DEFAULT NULL COMMENT 'Null nếu sản phẩm không có variant',
  `quantity` int NOT NULL DEFAULT '1',
  `price` decimal(10,2) NOT NULL COMMENT 'Giá tại thời điểm thêm vào giỏ',
  `added_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_cart_product` (`cart_id`,`product_id`,`variant_id`),
  KEY `product_id` (`product_id`),
  KEY `variant_id` (`variant_id`),
  KEY `idx_cart` (`cart_id`),
  CONSTRAINT `cart_items_ibfk_1` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`id`) ON DELETE CASCADE,
  CONSTRAINT `cart_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  CONSTRAINT `cart_items_ibfk_3` FOREIGN KEY (`variant_id`) REFERENCES `product_variants` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=92 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_items`
--

LOCK TABLES `cart_items` WRITE;
/*!40000 ALTER TABLE `cart_items` DISABLE KEYS */;
INSERT INTO `cart_items` VALUES (4,3,3,NULL,3,900000.00,'2025-10-03 05:05:00','2025-10-03 05:05:00'),(5,4,5,5,2,500000.00,'2025-10-04 06:05:00','2025-10-04 06:05:00'),(6,5,6,6,1,300000.00,'2025-10-05 07:05:00','2025-10-05 07:05:00'),(8,7,8,8,1,700000.00,'2025-10-07 09:05:00','2025-10-07 09:05:00'),(9,8,9,9,2,350000.00,'2025-10-08 10:05:00','2025-10-08 10:05:00'),(10,9,10,NULL,1,250000.00,'2025-10-09 11:05:00','2025-10-09 11:05:00'),(88,15,99,NULL,1,11000.00,'2025-11-17 19:12:47','2025-11-17 19:33:54'),(91,20,10,30,1,945000.00,'2025-11-19 13:10:20','2025-11-19 13:10:20');
/*!40000 ALTER TABLE `cart_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `session_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Cho guest users',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_user` (`user_id`),
  KEY `idx_session` (`session_id`),
  CONSTRAINT `carts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
INSERT INTO `carts` VALUES (3,3,NULL,'2025-10-03 05:00:00','2025-10-03 05:00:00'),(4,4,NULL,'2025-10-04 06:00:00','2025-10-04 06:00:00'),(5,5,'sess_guest2','2025-10-05 07:00:00','2025-10-05 07:00:00'),(7,7,NULL,'2025-10-07 09:00:00','2025-10-07 09:00:00'),(8,8,'sess_guest3','2025-10-08 10:00:00','2025-10-08 10:00:00'),(9,9,NULL,'2025-10-09 11:00:00','2025-10-09 11:00:00'),(10,10,NULL,'2025-10-10 12:00:00','2025-10-10 12:00:00'),(15,14,NULL,'2025-11-16 08:29:27','2025-11-16 08:29:27'),(20,18,NULL,'2025-11-17 19:16:37','2025-11-17 19:16:37');
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `image_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `icon_class` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'CSS class cho icon',
  `parent_id` int DEFAULT NULL,
  `level` int DEFAULT '0' COMMENT '0=root, 1=sub, 2=sub-sub',
  `sort_order` int DEFAULT '0',
  `is_featured` tinyint(1) DEFAULT '0',
  `is_active` tinyint(1) DEFAULT '1',
  `seo_title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `seo_description` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  KEY `idx_parent` (`parent_id`),
  KEY `idx_slug` (`slug`),
  KEY `idx_featured` (`is_featured`,`is_active`),
  CONSTRAINT `categories_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Protein','protein','Các sản phẩm protein hỗ trợ xây dựng cơ bắp','/uploads/aebdda8ea4b9bc7101b784beaf6610dc82.png',NULL,NULL,0,1,1,1,NULL,NULL,'2025-10-11 02:09:04','2025-10-17 03:23:32'),(2,'Mass Gainer','mass-gainer','Sản phẩm tăng cân, tăng khối lượng cơ','/uploads/73b27e5cdcd8c610c37719a9a6dfaee8a.png',NULL,NULL,0,2,1,1,NULL,NULL,'2025-10-11 02:09:04','2025-10-17 03:26:59'),(3,'Pre-Workout','pre-workout','Sản phẩm uống trước khi tập luyện','/uploads/eb20b90c735fc847de1b5701026710010b.png',NULL,NULL,0,3,1,1,NULL,NULL,'2025-10-11 02:09:04','2025-10-17 03:29:14'),(4,'BCAA & Amino','bcaa-amino','Axit amin thiết yếu cho cơ bắp','/uploads/3ef437cb6ef2348c35baed4bf9651b1b.png',NULL,NULL,0,4,1,1,NULL,NULL,'2025-10-11 02:09:04','2025-10-17 03:33:25'),(5,'Vitamins & Minerals','vitamins-minerals','Vitamin và khoáng chất','/uploads/dcd1096516b9b443d3a6042b7397e971f.png',NULL,NULL,0,5,1,1,NULL,NULL,'2025-10-11 02:09:04','2025-10-17 03:35:54'),(6,'Gym Accessories','gym-accessories','Phụ kiện tập gym','/uploads/538adc05fc8795e3ca49cb7a8f8eeea8.png',NULL,NULL,0,6,0,1,NULL,NULL,'2025-10-11 02:09:04','2025-10-17 03:36:13'),(8,'Whey Proteinqqq','whey-protein 11','Protein từ whey   d','/uploads/a2f3fb94b26a11b810f49fa352917a5e.png',NULL,1,1,1,0,1,NULL,NULL,'2025-10-11 02:09:04','2025-11-15 07:30:41'),(9,'Casein Protein','casein-protein','Protein casein tiêu hóa chậm','/uploads/06f101e977561953882c0f64cf1a80d1e.png',NULL,1,1,2,0,1,NULL,NULL,'2025-10-11 02:09:04','2025-10-17 03:41:45'),(10,'Plant Protein','plant-protein','Protein thực vật','/uploads/91910d9b5ccc651d303f9a424d5acc897.png',NULL,1,1,3,0,1,NULL,NULL,'2025-10-11 02:09:04','2025-10-17 03:39:05'),(11,'phụ kiên thể \\','phụ kiên thể thao','Các sản phẩm  mới nhất',NULL,NULL,NULL,0,12,0,0,NULL,NULL,'2025-11-15 06:53:00','2025-11-19 18:51:09');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer_tiers`
--

DROP TABLE IF EXISTS `customer_tiers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer_tiers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'VIP, Premium, Regular, Bronze, Silver, Gold',
  `discount_rate` decimal(5,2) DEFAULT '0.00' COMMENT 'Tỷ lệ giảm giá (%)',
  `min_order_amount` decimal(12,2) DEFAULT '0.00' COMMENT 'Số tiền tối thiểu để đạt tier',
  `points_multiplier` decimal(3,2) DEFAULT '1.00' COMMENT 'Hệ số nhân điểm',
  `description` text COLLATE utf8mb4_unicode_ci,
  `benefits` json DEFAULT NULL COMMENT 'Các quyền lợi: ["free_shipping", "priority_support", "exclusive_deals"]',
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer_tiers`
--

LOCK TABLES `customer_tiers` WRITE;
/*!40000 ALTER TABLE `customer_tiers` DISABLE KEYS */;
INSERT INTO `customer_tiers` VALUES (1,'Regular',0.00,0.00,1.00,'Khách hàng thường','[\"basic_support\"]',1,'2025-10-11 02:09:04'),(2,'Bronze',2.00,2000000.00,1.20,'Khách hàng đồng','[\"basic_support\", \"birthday_discount\"]',1,'2025-10-11 02:09:04'),(3,'Silver',5.00,5000000.00,1.50,'Khách hàng bạc','[\"priority_support\", \"free_shipping_50k\", \"birthday_discount\"]',1,'2025-10-11 02:09:04'),(4,'Gold',8.00,10000000.00,2.00,'Khách hàng vàng','[\"priority_support\", \"free_shipping\", \"exclusive_deals\", \"birthday_discount\"]',1,'2025-10-11 02:09:04'),(5,'VIP',12.00,20000000.00,3.00,'Khách hàng VIP','[\"vip_support\", \"free_shipping\", \"exclusive_deals\", \"early_access\", \"birthday_discount\"]',1,'2025-10-11 02:09:04'),(26,'Platinum',10.00,15000000.00,2.50,'Khách hàng bạch kim','[\"priority_support\", \"free_shipping\", \"exclusive_deals\", \"vip_events\", \"birthday_discount\"]',1,'2025-10-11 03:08:27'),(27,'Diamond',15.00,30000000.00,4.00,'Khách hàng kim cương','[\"concierge_service\", \"free_shipping\", \"exclusive_deals\", \"early_access\", \"birthday_discount\", \"personal_trainer\"]',1,'2025-10-11 03:08:27'),(28,'Elite',18.00,50000000.00,5.00,'Khách hàng ưu tú','[\"concierge_service\", \"free_shipping\", \"exclusive_deals\", \"early_access\", \"birthday_discount\", \"personal_trainer\", \"custom_products\"]',1,'2025-10-11 03:08:27'),(29,'Royal',20.00,100000000.00,6.00,'Khách hàng hoàng gia','[\"concierge_service\", \"free_shipping\", \"exclusive_deals\", \"early_access\", \"birthday_discount\", \"personal_trainer\", \"custom_products\", \"lifetime_support\"]',1,'2025-10-11 03:08:27'),(30,'Legend',25.00,200000000.00,7.00,'Khách hàng huyền thoại','[\"concierge_service\", \"free_shipping\", \"exclusive_deals\", \"early_access\", \"birthday_discount\", \"personal_trainer\", \"custom_products\", \"lifetime_support\", \"charity_match\"]',1,'2025-10-11 03:08:27');
/*!40000 ALTER TABLE `customer_tiers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `discount_codes`
--

DROP TABLE IF EXISTS `discount_codes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `discount_codes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` enum('percentage','fixed','free_shipping') COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` decimal(10,2) NOT NULL COMMENT 'Giá trị (% hoặc số tiền)',
  `minimum_order_amount` decimal(10,2) DEFAULT '0.00',
  `maximum_discount_amount` decimal(10,2) DEFAULT NULL COMMENT 'Giảm tối đa (cho percentage)',
  `usage_limit` int DEFAULT NULL COMMENT 'Tổng số lần sử dụng tối đa',
  `usage_limit_per_customer` int DEFAULT '1',
  `used_count` int DEFAULT '0',
  `start_date` timestamp NOT NULL,
  `end_date` timestamp NOT NULL,
  `applicable_to` enum('all','specific_products','specific_categories','specific_brands') COLLATE utf8mb4_unicode_ci DEFAULT 'all',
  `applicable_items` json DEFAULT NULL COMMENT 'IDs của products/categories/brands',
  `is_active` tinyint(1) DEFAULT '1',
  `created_by` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `created_by` (`created_by`),
  KEY `idx_code` (`code`),
  KEY `idx_dates` (`start_date`,`end_date`),
  KEY `idx_active` (`is_active`),
  CONSTRAINT `discount_codes_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `discount_codes`
--

LOCK TABLES `discount_codes` WRITE;
/*!40000 ALTER TABLE `discount_codes` DISABLE KEYS */;
INSERT INTO `discount_codes` VALUES (1,'SAVE10','Giảm 10%','Giảm 10% cho đơn đầu','/uploads/e1824d91a1094a431f10f224a927415e1010.png','percentage',10.00,500000.00,200000.00,100,1,14,'2024-12-31 17:00:00','2025-12-31 16:59:59','all',NULL,1,NULL,'2025-10-11 03:28:23','2025-11-16 10:44:42'),(2,'BRONZE5','Bronze 5%','Dành cho tier Bronze','/uploads/8faa88145664341af1082a7c757792d25.png','percentage',5.00,1000000.00,NULL,50,1,5,'2024-12-31 17:00:00','2025-12-31 16:59:59','all',NULL,1,NULL,'2025-10-11 03:28:23','2025-11-13 03:57:22'),(3,'WELCOME20','Chào mừng 20%','Giảm 20% đơn đầu','/uploads/97679ef67778699846d8ae13d272fa3d.png','percentage',20.00,0.00,500000.00,200,1,10,'2024-12-31 17:00:00','2025-06-30 16:59:59','all',NULL,1,NULL,'2025-10-11 03:28:23','2025-10-18 06:19:59'),(4,'FREESHIP','Miễn phí ship','Miễn phí vận chuyển','/uploads/70fb91092a14f4d46231d1ff3df163e79.png','free_shipping',0.00,1500000.00,NULL,NULL,1,3,'2024-12-31 17:00:00','2025-12-31 16:59:59','all',NULL,1,NULL,'2025-10-11 03:28:23','2025-10-18 06:20:03'),(5,'PROTEIN10','Giảm protein 10%','Giảm cho protein','/uploads/c5d5da3ffe50e20ca20cfd66a6b91119.png','percentage',10.00,500000.00,100000.00,30,1,1,'2024-12-31 17:00:00','2025-03-31 16:59:59','specific_categories','[1]',1,NULL,'2025-10-11 03:28:23','2025-10-18 06:20:07'),(6,'FLASH50K','Flash giảm 50k','Giảm fixed 50k','/uploads/f6d2f9d5598f8e95c975065c16910850a.png','fixed',50000.00,300000.00,NULL,100,1,0,'2025-09-30 17:00:00','2025-10-07 16:59:59','all',NULL,1,NULL,'2025-10-11 03:28:23','2025-10-18 06:20:12'),(7,'VIP15','VIP 15%','Dành cho VIP','/uploads/7352d2a91a18bf910cca6192733c10b3bc.png','percentage',15.00,2000000.00,NULL,20,1,3,'2024-12-31 17:00:00','2025-12-31 16:59:59','all',NULL,1,NULL,'2025-10-11 03:28:23','2025-11-16 10:49:28'),(8,'ONBRAND20','Optimum 20%','Giảm cho brand ON','/uploads/70328457705109e24016105d314c6c5951.png','percentage',20.00,1000000.00,200000.00,50,1,0,'2024-12-31 17:00:00','2025-12-31 16:59:59','specific_brands','[1]',1,NULL,'2025-10-11 03:28:23','2025-10-18 06:20:19'),(9,'NEWUSER','New user 100k','Giảm 100k cho user mới','/uploads/148110c840cb63a6caf7274edaa2d29f7.png','fixed',100000.00,500000.00,NULL,100,1,4,'2024-12-31 17:00:00','2025-06-30 16:59:59','all',NULL,1,NULL,'2025-10-11 03:28:23','2025-10-18 06:20:23'),(10,'SUMMER25','Summer sale 25%','Giảm 25% hè','/uploads/a0daf7d2ef12224eb7c8899a011049bc4.png','percentage',25.00,800000.00,300000.00,80,1,0,'2025-05-31 17:00:00','2025-08-31 16:59:59','all',NULL,1,NULL,'2025-10-11 03:28:23','2025-10-18 06:20:27'),(11,'GIAM2NGHIN','DFA','wfdafdadwqfdw','/uploads/3cd8aa6d310417d997ccdbd4ec2cb44e7.jpg','fixed',2000.00,50000000.00,NULL,0,1,0,'2015-12-11 00:00:00','2026-12-11 00:00:00','all',NULL,0,NULL,'2025-11-18 18:04:35','2025-11-18 18:31:12');
/*!40000 ALTER TABLE `discount_codes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `flash_sale_items`
--

DROP TABLE IF EXISTS `flash_sale_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `flash_sale_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `flash_sale_id` int NOT NULL,
  `product_id` int NOT NULL,
  `variant_id` int DEFAULT NULL,
  `original_price` decimal(10,2) NOT NULL,
  `sale_price` decimal(10,2) NOT NULL,
  `max_quantity` int NOT NULL COMMENT 'Số lượng tối đa cho sale',
  `sold_quantity` int DEFAULT '0' COMMENT 'Đã bán',
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_flash_sale_product` (`flash_sale_id`,`product_id`,`variant_id`),
  KEY `product_id` (`product_id`),
  KEY `variant_id` (`variant_id`),
  KEY `idx_flash_sale` (`flash_sale_id`),
  CONSTRAINT `flash_sale_items_ibfk_1` FOREIGN KEY (`flash_sale_id`) REFERENCES `flash_sales` (`id`) ON DELETE CASCADE,
  CONSTRAINT `flash_sale_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  CONSTRAINT `flash_sale_items_ibfk_3` FOREIGN KEY (`variant_id`) REFERENCES `product_variants` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `flash_sale_items`
--

LOCK TABLES `flash_sale_items` WRITE;
/*!40000 ALTER TABLE `flash_sale_items` DISABLE KEYS */;
INSERT INTO `flash_sale_items` VALUES (2,2,2,3,1400000.00,1120000.00,15,3),(3,2,3,NULL,900000.00,765000.00,30,10),(4,2,4,4,800000.00,680000.00,25,2),(5,3,5,5,500000.00,450000.00,40,8),(6,3,6,6,300000.00,270000.00,50,1),(9,5,9,9,350000.00,315000.00,30,0),(10,5,10,NULL,250000.00,225000.00,25,0),(12,6,2,23,1500000.00,665000.00,100,5),(13,6,3,25,850000.00,595000.00,75,0),(14,6,4,28,1500000.00,1050000.00,30,2),(15,6,5,6,780000.00,546000.00,120,8),(16,6,6,7,920000.00,644000.00,60,0),(17,6,7,8,1100000.00,770000.00,40,3),(18,6,8,9,650000.00,455000.00,150,12),(19,6,9,10,890000.00,623000.00,80,1),(20,6,10,30,1350000.00,945000.00,25,0),(21,7,45,NULL,400000.00,300000.00,12,0),(22,7,8,NULL,1500000.00,1200000.00,15,0),(24,6,120,NULL,1500000.00,1000000.00,100,0);
/*!40000 ALTER TABLE `flash_sale_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `flash_sales`
--

DROP TABLE IF EXISTS `flash_sales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `flash_sales` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `start_time` timestamp NOT NULL,
  `end_time` timestamp NOT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `created_by` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `created_by` (`created_by`),
  KEY `idx_time` (`start_time`,`end_time`),
  CONSTRAINT `flash_sales_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `flash_sales`
--

LOCK TABLES `flash_sales` WRITE;
/*!40000 ALTER TABLE `flash_sales` DISABLE KEYS */;
INSERT INTO `flash_sales` VALUES (1,'Flash Sale Protein','Giảm giá protein 20%','2025-09-30 17:00:00','2025-10-03 16:59:59',0,NULL,'2025-10-11 03:28:23'),(2,'Weekend Deal','Cuối tuần giảm 15%','2025-10-03 17:00:00','2025-10-05 16:59:59',0,NULL,'2025-10-11 03:28:23'),(3,'New Arrival Sale','Sản phẩm mới giảm 10%','2025-10-05 17:00:00','2025-10-08 16:59:59',0,NULL,'2025-10-11 03:28:23'),(5,'Vitamin Flash','Vitamin giảm giá','2025-10-10 17:00:00','2025-10-12 16:59:59',0,NULL,'2025-10-11 03:28:23'),(6,'Flash Sale Protein','Giảm giá protein 30%','2025-10-10 17:00:00','2025-12-29 17:00:00',1,NULL,'2025-10-11 03:28:23'),(7,'CUỐI TUẦN ','DSAFWAFG','2025-11-03 08:26:00','2025-11-28 08:26:00',0,NULL,'2025-11-19 08:27:07');
/*!40000 ALTER TABLE `flash_sales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventory_transactions`
--

DROP TABLE IF EXISTS `inventory_transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventory_transactions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `variant_id` int DEFAULT NULL,
  `transaction_type` enum('purchase','sale','adjustment') COLLATE utf8mb4_unicode_ci NOT NULL,
  `warehouse_id` int NOT NULL,
  `type` enum('in','out','adjustment','damaged','expired') COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantity` int NOT NULL COMMENT 'Số lượng (dương cho in, âm cho out)',
  `previous_quantity` int NOT NULL,
  `new_quantity` int NOT NULL,
  `reason` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `reference_type` enum('purchase','sale','adjustment','return','damage') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `reference_id` int DEFAULT NULL COMMENT 'ID của order, purchase, etc.',
  `unit_cost` decimal(10,2) DEFAULT NULL,
  `total_cost` decimal(12,2) DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `balance_after` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `notes` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`),
  KEY `variant_id` (`variant_id`),
  KEY `created_by` (`created_by`),
  KEY `idx_product` (`product_id`,`variant_id`),
  KEY `idx_warehouse` (`warehouse_id`),
  KEY `idx_type` (`type`),
  KEY `idx_created_at` (`created_at`),
  CONSTRAINT `inventory_transactions_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  CONSTRAINT `inventory_transactions_ibfk_2` FOREIGN KEY (`variant_id`) REFERENCES `product_variants` (`id`) ON DELETE CASCADE,
  CONSTRAINT `inventory_transactions_ibfk_3` FOREIGN KEY (`warehouse_id`) REFERENCES `warehouses` (`id`) ON DELETE CASCADE,
  CONSTRAINT `inventory_transactions_ibfk_4` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory_transactions`
--

LOCK TABLES `inventory_transactions` WRITE;
/*!40000 ALTER TABLE `inventory_transactions` DISABLE KEYS */;
INSERT INTO `inventory_transactions` VALUES (2,2,3,'purchase',1,'out',-1,26,25,'Order sale','sale',2,900000.00,900000.00,NULL,0,'2025-10-02 04:00:00',NULL),(3,3,NULL,'purchase',1,'out',-3,83,80,'Order sale','sale',3,500000.00,1500000.00,NULL,0,'2025-10-03 05:00:00',NULL),(4,4,4,'purchase',1,'in',100,0,100,'Purchase','purchase',100,400000.00,40000000.00,NULL,0,'2025-10-04 06:00:00','Nhập mới'),(5,5,5,'purchase',2,'out',-2,102,100,'Order sale','sale',4,250000.00,500000.00,NULL,0,'2025-10-04 06:00:00',NULL),(6,6,6,'purchase',1,'adjustment',10,65,75,'Adjustment','adjustment',NULL,NULL,NULL,NULL,0,'2025-10-05 07:00:00','Kiểm kê'),(7,7,7,'purchase',1,'out',-4,49,45,'Order sale','sale',5,200000.00,800000.00,NULL,0,'2025-10-05 07:00:00',NULL),(8,8,8,'purchase',2,'damaged',-5,35,30,'Damaged','damage',NULL,350000.00,1750000.00,NULL,0,'2025-10-06 08:00:00','Hỏng bao bì'),(9,9,9,'purchase',1,'out',-2,57,55,'Order sale','sale',7,180000.00,360000.00,NULL,0,'2025-10-07 09:00:00',NULL),(10,10,NULL,'purchase',1,'in',50,0,50,'Purchase','purchase',101,100000.00,5000000.00,NULL,0,'2025-10-08 10:00:00',NULL);
/*!40000 ALTER TABLE `inventory_transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `media_files`
--

DROP TABLE IF EXISTS `media_files`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `media_files` (
  `id` int NOT NULL AUTO_INCREMENT,
  `filename` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `original_filename` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `file_path` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `file_url` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `file_size` int NOT NULL COMMENT 'Size in bytes',
  `mime_type` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `file_type` enum('image','video','document','other') COLLATE utf8mb4_unicode_ci NOT NULL,
  `width` int DEFAULT NULL,
  `height` int DEFAULT NULL,
  `alt_text` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `uploaded_by` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_type` (`file_type`),
  KEY `idx_uploaded_by` (`uploaded_by`),
  CONSTRAINT `media_files_ibfk_1` FOREIGN KEY (`uploaded_by`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `media_files`
--

LOCK TABLES `media_files` WRITE;
/*!40000 ALTER TABLE `media_files` DISABLE KEYS */;
INSERT INTO `media_files` VALUES (3,'img1.jpg','gold_standard_whey.jpg','/uploads/products/img1.jpg','/media/img1.jpg',102400,'image/jpeg','image',800,600,'Gold Standard Whey',NULL,'2025-10-11 03:28:23'),(4,'img2.png','hydrolyzed_whey.png','/uploads/products/img2.png','/media/img2.png',204800,'image/png','image',1024,768,'Hydrolyzed Whey',NULL,'2025-10-11 03:28:23'),(5,'banner1.jpg','hero_banner1.jpg','/uploads/banners/banner1.jpg','/media/banner1.jpg',307200,'image/jpeg','image',1920,1080,'Hero Banner',NULL,'2025-10-11 03:28:23'),(6,'review1.jpg','review_image1.jpg','/uploads/reviews/review1.jpg','/media/review1.jpg',51200,'image/jpeg','image',400,300,'Review Image',NULL,'2025-10-11 03:28:23'),(7,'logo1.png','brand_logo1.png','/uploads/brands/logo1.png','/media/logo1.png',25600,'image/png','image',200,100,'Brand Logo',NULL,'2025-10-11 03:28:23'),(8,'pdf1.pdf','product_manual.pdf','/uploads/docs/pdf1.pdf','/media/pdf1.pdf',1024000,'application/pdf','document',NULL,NULL,'Product Manual',NULL,'2025-10-11 03:28:23'),(9,'img3.jpg','pre_workout.jpg','/uploads/products/img3.jpg','/media/img3.jpg',153600,'image/jpeg','image',900,700,'Pre-Workout',NULL,'2025-10-11 03:28:23'),(10,'video1.mp4','product_demo.mp4','/uploads/videos/video1.mp4','/media/video1.mp4',5242880,'video/mp4','video',NULL,NULL,'Product Demo',NULL,'2025-10-11 03:28:23'),(11,'img4.png','vitamin_label.png','/uploads/products/img4.png','/media/img4.png',81920,'image/png','image',500,400,'Vitamin Label',NULL,'2025-10-11 03:28:23'),(12,'doc1.doc','invoice_template.doc','/uploads/docs/doc1.doc','/media/doc1.doc',51200,'application/msword','document',NULL,NULL,'Invoice Template',NULL,'2025-10-11 03:28:23');
/*!40000 ALTER TABLE `media_files` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menus`
--

DROP TABLE IF EXISTS `menus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menus` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `parent_id` int DEFAULT NULL,
  `position` int DEFAULT '0',
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `parent_id` (`parent_id`),
  CONSTRAINT `menus_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `menus` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menus`
--

LOCK TABLES `menus` WRITE;
/*!40000 ALTER TABLE `menus` DISABLE KEYS */;
INSERT INTO `menus` VALUES (1,'Danh mục','/categories',NULL,1,1,'2025-10-31 10:14:32','2025-10-31 10:14:32'),(2,'Công Cụ','/tools',NULL,2,1,'2025-10-31 10:14:32','2025-10-31 10:14:32'),(3,'Kiến Thức','/knowledge',NULL,3,1,'2025-10-31 10:14:32','2025-10-31 10:14:32'),(4,'Hệ thống cửa hàng','/stores',NULL,4,1,'2025-10-31 10:14:32','2025-10-31 10:14:32'),(5,'Tin Tức','/news',NULL,5,1,'2025-10-31 10:14:32','2025-10-31 10:14:32'),(6,'Liên Hệ','/contact',NULL,6,1,'2025-10-31 10:14:32','2025-10-31 10:14:32'),(7,'Thực phẩm bổ sung','/categories/supplements',1,1,1,'2025-10-31 10:14:32','2025-10-31 10:14:32'),(8,'Phụ kiện tập gym','/categories/accessories',1,2,1,'2025-10-31 10:14:32','2025-10-31 10:14:32'),(9,'Quần áo thể hình','/categories/clothes',1,3,1,'2025-10-31 10:14:32','2025-10-31 10:14:32'),(10,'Dinh dưỡng','/knowledge/nutrition',3,1,1,'2025-10-31 10:14:32','2025-10-31 10:14:32'),(11,'Tập luyện','/knowledge/workout',3,2,1,'2025-10-31 10:14:32','2025-10-31 10:14:32'),(12,'Tin khuyến mãi','/news/sale',5,1,1,'2025-10-31 10:14:32','2025-10-31 10:14:32'),(13,'Sự kiện','/news/events',5,2,1,'2025-10-31 10:14:32','2025-10-31 10:14:32');
/*!40000 ALTER TABLE `menus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `newsletter_subscribers`
--

DROP TABLE IF EXISTS `newsletter_subscribers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `newsletter_subscribers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('active','unsubscribed','bounced') COLLATE utf8mb4_unicode_ci DEFAULT 'active',
  `source` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Nguồn đăng ký: website, popup, checkout',
  `subscribed_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `unsubscribed_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `idx_email` (`email`),
  KEY `idx_status` (`status`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `newsletter_subscribers`
--

LOCK TABLES `newsletter_subscribers` WRITE;
/*!40000 ALTER TABLE `newsletter_subscribers` DISABLE KEYS */;
INSERT INTO `newsletter_subscribers` VALUES (1,'sub1@example.com','Subscriber 1','active','website','2024-12-31 17:00:00',NULL),(2,'sub2@example.com','Subscriber 2','active','popup','2025-01-01 17:00:00',NULL),(3,'sub3@example.com','Subscriber 3','unsubscribed','checkout','2025-01-02 17:00:00','2025-05-31 17:00:00'),(4,'sub4@example.com','Subscriber 4','active','website','2025-01-03 17:00:00',NULL),(5,'sub5@example.com','Subscriber 5','bounced','popup','2025-01-04 17:00:00',NULL),(6,'sub6@example.com','Subscriber 6','active','checkout','2025-01-05 17:00:00',NULL),(7,'sub7@example.com','Subscriber 7','active','website','2025-01-06 17:00:00',NULL),(8,'sub8@example.com','Subscriber 8','unsubscribed','popup','2025-01-07 17:00:00','2025-06-30 17:00:00'),(9,'sub9@example.com','Subscriber 9','active','checkout','2025-01-08 17:00:00',NULL),(10,'sub10@example.com','Subscriber 10','active','website','2025-01-09 17:00:00',NULL);
/*!40000 ALTER TABLE `newsletter_subscribers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL COMMENT 'Null để gửi cho tất cả',
  `type` enum('order_update','promotion','system','review_reminder','stock_alert') COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `action_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_read` tinyint(1) DEFAULT '0',
  `read_at` timestamp NULL DEFAULT NULL,
  `metadata` json DEFAULT NULL COMMENT 'Thông tin bổ sung: order_id, product_id, etc.',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `expires_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_user` (`user_id`),
  KEY `idx_type` (`type`),
  KEY `idx_read` (`is_read`),
  KEY `idx_created` (`created_at`),
  CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
INSERT INTO `notifications` VALUES (2,NULL,'promotion','Flash Sale Protein','Giảm 20% protein đến 03/10','/flash-sales/1',1,'2025-10-02 03:00:00','{\"sale_id\": 1}','2025-09-30 17:00:00','2025-10-03 16:59:59'),(4,3,'review_reminder','Đánh giá đơn hàng GS20251003','Hãy đánh giá để nhận điểm thưởng','/orders/3/review',0,NULL,'{\"order_id\": 3}','2025-10-10 05:00:00',NULL),(5,4,'stock_alert','Sản phẩm yêu thích hết hàng','Pre-Workout C4 tạm hết','/products/4',1,'2025-10-05 06:00:00','{\"product_id\": 4}','2025-10-04 06:00:00',NULL),(6,5,'order_update','Đơn hàng GS20251005 đã giao','Giao thành công','/orders/5',0,NULL,'{\"order_id\": 5}','2025-10-07 07:00:00','2025-11-07 07:00:00'),(7,NULL,'system','Cập nhật hệ thống','Website bảo trì 1h',NULL,1,'2025-10-06 08:00:00',NULL,'2025-10-06 08:00:00',NULL),(9,7,'order_update','Đơn hàng GS20251007 đã hủy','Đơn hàng bị hủy, hoàn tiền','/orders/7',1,'2025-10-08 02:00:00','{\"order_id\": 7}','2025-10-08 02:00:00',NULL),(10,8,'stock_alert','Sản phẩm restock','Omega 3 đã về hàng','/products/9',0,NULL,'{\"product_id\": 9}','2025-10-09 10:00:00',NULL);
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nutritional_info`
--

DROP TABLE IF EXISTS `nutritional_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nutritional_info` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `serving_size` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Khẩu phần: 30g, 1 scoop',
  `servings_per_container` int DEFAULT NULL COMMENT 'Số khẩu phần/hộp',
  `calories` decimal(8,2) DEFAULT NULL,
  `protein` decimal(8,2) DEFAULT NULL,
  `carbohydrates` decimal(8,2) DEFAULT NULL,
  `fat` decimal(8,2) DEFAULT NULL,
  `fiber` decimal(8,2) DEFAULT NULL,
  `sugar` decimal(8,2) DEFAULT NULL,
  `sodium` decimal(8,2) DEFAULT NULL,
  `additional_nutrients` json DEFAULT NULL COMMENT '{"creatine": {"value": 5, "unit": "g"}, "bcaa": {"value": 10, "unit": "g"}}',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_product_nutrition` (`product_id`),
  CONSTRAINT `nutritional_info_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nutritional_info`
--

LOCK TABLES `nutritional_info` WRITE;
/*!40000 ALTER TABLE `nutritional_info` DISABLE KEYS */;
INSERT INTO `nutritional_info` VALUES (2,2,'1 scoop (32g)',31,110.00,25.00,2.00,0.50,0.00,0.00,40.00,'{\"isolate\": {\"unit\": \"g\", \"value\": 22}}','2025-10-11 03:28:23','2025-10-11 03:28:23'),(3,3,'2 scoops (334g)',3,1250.00,52.00,252.00,4.50,0.00,5.00,410.00,'{\"creatine\": {\"unit\": \"g\", \"value\": 3}}','2025-10-11 03:28:23','2025-10-11 03:28:23'),(4,4,'1 scoop (6g)',30,0.00,0.00,0.00,0.00,0.00,0.00,0.00,'{\"caffeine\": {\"unit\": \"mg\", \"value\": 150}}','2025-10-11 03:28:23','2025-10-11 03:28:23'),(5,5,'1 scoop (7g)',40,0.00,0.00,0.00,0.00,0.00,0.00,0.00,'{\"leucine\": {\"unit\": \"g\", \"value\": 3}}','2025-10-11 03:28:23','2025-10-11 03:28:23'),(6,6,'1 tablet',60,0.00,0.00,0.00,0.00,0.00,0.00,0.00,'{\"vitamin_c\": {\"unit\": \"mg\", \"value\": 60}}','2025-10-11 03:28:23','2025-10-11 03:28:23'),(7,7,'1 scoop (5g)',60,0.00,0.00,0.00,0.00,0.00,0.00,0.00,NULL,'2025-10-11 03:28:23','2025-10-11 03:28:23'),(8,8,'1 capsule',45,0.00,0.00,0.00,0.00,0.00,0.00,0.00,'{\"green_tea\": {\"unit\": \"mg\", \"value\": 200}}','2025-10-11 03:28:23','2025-10-11 03:28:23'),(9,9,'1 softgel',60,10.00,0.00,0.00,1.00,0.00,0.00,0.00,'{\"epa\": {\"unit\": \"mg\", \"value\": 180}}','2025-10-11 03:28:23','2025-10-11 03:28:23'),(10,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-10-11 03:28:23','2025-10-11 03:28:23');
/*!40000 ALTER TABLE `nutritional_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `product_id` int DEFAULT NULL,
  `variant_id` int DEFAULT NULL,
  `product_name` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `variant_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sku` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `quantity` int NOT NULL,
  `unit_price` decimal(10,2) NOT NULL,
  `total_price` decimal(10,2) NOT NULL,
  `product_image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  KEY `variant_id` (`variant_id`),
  KEY `idx_order` (`order_id`),
  CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE SET NULL,
  CONSTRAINT `order_items_ibfk_3` FOREIGN KEY (`variant_id`) REFERENCES `product_variants` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=91 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
INSERT INTO `order_items` VALUES (1,1,NULL,NULL,'Gold Standard Whey','2kg Chocolate','GSW-CHOC-2KG',2,1200000.00,2400000.00,'/images/gsw-choc.jpg'),(2,1,4,4,'Pre-Workout C4','Original 30 servings','PWC-ORIGINAL',1,800000.00,800000.00,'/images/pwc-orig.jpg'),(3,2,2,3,'Hydrolyzed Whey','1kg Isolate','HW-ISOL-1KG',1,1400000.00,1400000.00,'/images/hw-isol.jpg'),(4,3,3,NULL,'Mass Gainer Extreme',NULL,'MGE001',3,900000.00,2700000.00,'/images/mge.jpg'),(5,4,5,5,'BCAA 2:1:1','300g Fruit Punch','BCA-FRUIT-300G',2,500000.00,1000000.00,'/images/bca-fruit.jpg'),(6,5,6,6,'Multivitamin Daily','60 tablets','MVD-60TAB',1,300000.00,300000.00,'/images/mvd-60.jpg'),(7,5,7,7,'Creatine Monohydrate','300g Powder','CM-300G',4,400000.00,1600000.00,'/images/cm-300.jpg'),(8,6,8,8,'Fat Burner Shred','90 capsules','FBS-90CAP',1,700000.00,700000.00,'/images/fbs-90.jpg'),(9,7,9,9,'Omega 3 Fish Oil','1000mg 60 softgels','O3FO-1000MG',2,350000.00,700000.00,'/images/o3fo-1000.jpg'),(10,8,10,NULL,'Gym Belt',NULL,'GB001',1,250000.00,250000.00,'/images/gb.jpg'),(11,12,76,NULL,'Magnesium Glycinate 400mg - 120 caps',NULL,'VIT-MAG-001-V2',1,280000.00,280000.00,'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800'),(12,13,76,NULL,'Magnesium Glycinate 400mg - 120 caps',NULL,'VIT-MAG-001-V2',1,280000.00,280000.00,'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800'),(13,14,76,NULL,'Magnesium Glycinate 400mg - 120 caps',NULL,'VIT-MAG-001-V2',1,280000.00,280000.00,'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800'),(14,15,76,NULL,'Magnesium Glycinate 400mg - 120 caps',NULL,'VIT-MAG-001-V2',1,280000.00,280000.00,'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800'),(15,16,76,NULL,'Magnesium Glycinate 400mg - 120 caps',NULL,'VIT-MAG-001-V2',1,280000.00,280000.00,'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800'),(16,17,42,NULL,'Omega-3 Fish Oil',NULL,'OMEG-1000-90-V2',1,450000.00,450000.00,'/uploads/f803575d10279c6f94106978776a2d4736.png'),(17,17,76,NULL,'Magnesium Glycinate 400mg - 120 caps',NULL,'VIT-MAG-001-V2',1,280000.00,280000.00,'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800'),(18,18,42,NULL,'Omega-3 Fish Oil',NULL,'OMEG-1000-90-V2',1,450000.00,450000.00,'/uploads/f803575d10279c6f94106978776a2d4736.png'),(19,18,76,NULL,'Magnesium Glycinate 400mg - 120 caps',NULL,'VIT-MAG-001-V2',1,280000.00,280000.00,'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800'),(20,19,42,NULL,'Omega-3 Fish Oil',NULL,'OMEG-1000-90-V2',1,450000.00,450000.00,'/uploads/f803575d10279c6f94106978776a2d4736.png'),(21,19,76,NULL,'Magnesium Glycinate 400mg - 120 caps',NULL,'VIT-MAG-001-V2',1,280000.00,280000.00,'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800'),(22,20,42,NULL,'Omega-3 Fish Oil',NULL,'OMEG-1000-90-V2',1,450000.00,450000.00,'/uploads/f803575d10279c6f94106978776a2d4736.png'),(23,20,76,NULL,'Magnesium Glycinate 400mg - 120 caps',NULL,'VIT-MAG-001-V2',1,280000.00,280000.00,'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800'),(24,21,42,NULL,'Omega-3 Fish Oil',NULL,'OMEG-1000-90-V2',1,450000.00,450000.00,'/uploads/f803575d10279c6f94106978776a2d4736.png'),(25,21,76,NULL,'Magnesium Glycinate 400mg - 120 caps',NULL,'VIT-MAG-001-V2',1,280000.00,280000.00,'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800'),(26,22,7,NULL,'Creatine Monohydrate',NULL,'CM001',1,1000.00,1000.00,'/uploads/7c7874e72fb198985455b971f11036a87.png'),(27,23,7,NULL,'Creatine Monohydrate',NULL,'CM001',1,1000.00,1000.00,'/uploads/7c7874e72fb198985455b971f11036a87.png'),(28,24,7,NULL,'Creatine Monohydrate',NULL,'CM001',1,1000.00,1000.00,'/uploads/7c7874e72fb198985455b971f11036a87.png'),(29,25,7,NULL,'Creatine Monohydrate',NULL,'CM001',2,1000.00,2000.00,'/uploads/7c7874e72fb198985455b971f11036a87.png'),(30,25,8,NULL,'Fat Burner Shred',NULL,'FBS001',1,700000.00,700000.00,'/uploads/7e8386a7a8be66348143f72810ce67497.png'),(31,25,9,NULL,'Omega 3 Fish Oil',NULL,'O3FO001',1,350000.00,350000.00,'/uploads/beff07a4ca91afcae27dd3efc3d23696.png'),(32,25,10,NULL,'Gym Belt',NULL,'GB001',1,250000.00,250000.00,'/uploads/aa6da57ebc3274231aff81e9fe2e1b6d.png'),(33,26,7,NULL,'Creatine Monohydrate',NULL,'CM001',1,1000.00,1000.00,'/uploads/7c7874e72fb198985455b971f11036a87.png'),(34,27,7,NULL,'Creatine Monohydrate',NULL,'CM001',1,1000.00,1000.00,'/uploads/7c7874e72fb198985455b971f11036a87.png'),(35,28,7,NULL,'Creatine Monohydrate',NULL,'CM001',1,1000.00,1000.00,'/uploads/7c7874e72fb198985455b971f11036a87.png'),(36,29,7,NULL,'Creatine Monohydrate',NULL,'CM001',1,1000.00,1000.00,'/uploads/7c7874e72fb198985455b971f11036a87.png'),(37,30,2,NULL,'Hydrolyzed Whey',NULL,'HW001',1,1400000.00,1400000.00,'/uploads/e4daca5df18310e731d37f4666bf5e1034.png'),(38,30,7,NULL,'Creatine Monohydrate',NULL,'CM001',1,1000.00,1000.00,'/uploads/7c7874e72fb198985455b971f11036a87.png'),(39,31,2,NULL,'Hydrolyzed Whey',NULL,'HW001',1,1400000.00,1400000.00,'/uploads/e4daca5df18310e731d37f4666bf5e1034.png'),(40,31,7,NULL,'Creatine Monohydrate',NULL,'CM001',1,1000.00,1000.00,'/uploads/7c7874e72fb198985455b971f11036a87.png'),(41,32,7,NULL,'Creatine Monohydrate',NULL,'CM001',1,1000.00,1000.00,'/uploads/7c7874e72fb198985455b971f11036a87.png'),(42,33,6,NULL,'Multivitamin Daily',NULL,'MVD001',4,300000.00,1200000.00,'/uploads/fb11028523c781c3f8124418f78dc910bf.png'),(43,34,6,NULL,'Multivitamin Daily',NULL,'MVD001',4,300000.00,1200000.00,'/uploads/fb11028523c781c3f8124418f78dc910bf.png'),(44,35,6,NULL,'Multivitamin Daily',NULL,'MVD001',4,300000.00,1200000.00,'/uploads/fb11028523c781c3f8124418f78dc910bf.png'),(45,36,6,NULL,'Multivitamin Daily',NULL,'MVD001',4,300000.00,1200000.00,'/uploads/fb11028523c781c3f8124418f78dc910bf.png'),(46,37,6,NULL,'Multivitamin Daily',NULL,'MVD001',4,300000.00,1200000.00,'/uploads/fb11028523c781c3f8124418f78dc910bf.png'),(47,38,36,NULL,'Beef Protein Isolate',NULL,'MUSC-BEEF-2KG-V2',1,1350000.00,1350000.00,'/uploads/4bc215cb277a57146710b010213ddc3a3b.png'),(48,39,36,NULL,'Beef Protein Isolate',NULL,'MUSC-BEEF-2KG-V2',1,1350000.00,1350000.00,'/uploads/4bc215cb277a57146710b010213ddc3a3b.png'),(49,40,36,NULL,'Beef Protein Isolate',NULL,'MUSC-BEEF-2KG-V2',1,1350000.00,1350000.00,'/uploads/4bc215cb277a57146710b010213ddc3a3b.png'),(50,41,36,NULL,'Beef Protein Isolate',NULL,'MUSC-BEEF-2KG-V2',1,1350000.00,1350000.00,'/uploads/4bc215cb277a57146710b010213ddc3a3b.png'),(51,42,48,NULL,'Iron + Vitamin C',NULL,'IRON-60-V2',1,180000.00,180000.00,'/uploads/24ce462cc383a71052a1428061d18dc23.png'),(52,43,48,NULL,'Iron + Vitamin C',NULL,'IRON-60-V2',1,180000.00,180000.00,'/uploads/24ce462cc383a71052a1428061d18dc23.png'),(53,44,48,NULL,'Iron + Vitamin C',NULL,'IRON-60-V2',1,180000.00,180000.00,'/uploads/24ce462cc383a71052a1428061d18dc23.png'),(54,45,48,NULL,'Iron + Vitamin C',NULL,'IRON-60-V2',1,180000.00,180000.00,'/uploads/24ce462cc383a71052a1428061d18dc23.png'),(55,46,48,NULL,'Iron + Vitamin C',NULL,'IRON-60-V2',1,180000.00,180000.00,'/uploads/24ce462cc383a71052a1428061d18dc23.png'),(56,47,48,NULL,'Iron + Vitamin C',NULL,'IRON-60-V2',1,180000.00,180000.00,'/uploads/24ce462cc383a71052a1428061d18dc23.png'),(57,48,3,NULL,'Mass Gainer Extreme',NULL,'MGE001',2,900000.00,1800000.00,'/uploads/a6f3ebc87aaa93ffc11310d18950c010cf.png'),(58,48,7,NULL,'Creatine Monohydrate',NULL,'CM001',1,1000.00,1000.00,'/uploads/7c7874e72fb198985455b971f11036a87.png'),(59,49,2,NULL,'Hydrolyzed Whey',NULL,'HW001',1,1400000.00,1400000.00,'/uploads/e4daca5df18310e731d37f4666bf5e1034.png'),(60,49,3,NULL,'Mass Gainer Extreme',NULL,'MGE001',2,900000.00,1800000.00,'/uploads/a6f3ebc87aaa93ffc11310d18950c010cf.png'),(61,49,7,NULL,'Creatine Monohydrate',NULL,'CM001',1,1000.00,1000.00,'/uploads/7c7874e72fb198985455b971f11036a87.png'),(62,50,2,NULL,'Hydrolyzed Whey',NULL,'HW001',1,1400000.00,1400000.00,'/uploads/e4daca5df18310e731d37f4666bf5e1034.png'),(63,50,3,NULL,'Mass Gainer Extreme',NULL,'MGE001',2,900000.00,1800000.00,'/uploads/a6f3ebc87aaa93ffc11310d18950c010cf.png'),(64,50,7,NULL,'Creatine Monohydrate',NULL,'CM001',1,1000.00,1000.00,'/uploads/7c7874e72fb198985455b971f11036a87.png'),(65,51,2,NULL,'Hydrolyzed Whey',NULL,'HW001',1,1400000.00,1400000.00,'/uploads/e4daca5df18310e731d37f4666bf5e1034.png'),(66,51,3,NULL,'Mass Gainer Extreme',NULL,'MGE001',2,900000.00,1800000.00,'/uploads/a6f3ebc87aaa93ffc11310d18950c010cf.png'),(67,51,5,NULL,'BCAA 2:1:1',NULL,'BCA001',1,500000.00,500000.00,'/uploads/e562b09cb8babfefd104bcec64ace562a.png'),(68,51,7,NULL,'Creatine Monohydrate',NULL,'CM001',1,1000.00,1000.00,'/uploads/7c7874e72fb198985455b971f11036a87.png'),(69,51,8,NULL,'Fat Burner Shred',NULL,'FBS001',1,700000.00,700000.00,'/uploads/7e8386a7a8be66348143f72810ce67497.png'),(70,52,2,NULL,'Hydrolyzed Whey',NULL,'HW001',1,1400000.00,1400000.00,'/uploads/e4daca5df18310e731d37f4666bf5e1034.png'),(71,52,3,NULL,'Mass Gainer Extreme',NULL,'MGE001',4,900000.00,3600000.00,'/uploads/a6f3ebc87aaa93ffc11310d18950c010cf.png'),(72,52,5,NULL,'BCAA 2:1:1',NULL,'BCA001',1,500000.00,500000.00,'/uploads/e562b09cb8babfefd104bcec64ace562a.png'),(73,52,7,NULL,'Creatine Monohydrate',NULL,'CM001',1,1000.00,1000.00,'/uploads/7c7874e72fb198985455b971f11036a87.png'),(74,52,8,NULL,'Fat Burner Shred',NULL,'FBS001',1,700000.00,700000.00,'/uploads/7e8386a7a8be66348143f72810ce67497.png'),(75,53,2,NULL,'Hydrolyzed Whey',NULL,'HW001',1,1400000.00,1400000.00,'/uploads/e4daca5df18310e731d37f4666bf5e1034.png'),(76,53,3,NULL,'Mass Gainer Extreme',NULL,'MGE001',4,900000.00,3600000.00,'/uploads/a6f3ebc87aaa93ffc11310d18950c010cf.png'),(77,53,5,NULL,'BCAA 2:1:1',NULL,'BCA001',1,500000.00,500000.00,'/uploads/e562b09cb8babfefd104bcec64ace562a.png'),(78,53,7,NULL,'Creatine Monohydrate',NULL,'CM001',1,1000.00,1000.00,'/uploads/7c7874e72fb198985455b971f11036a87.png'),(79,53,8,NULL,'Fat Burner Shred',NULL,'FBS001',1,700000.00,700000.00,'/uploads/7e8386a7a8be66348143f72810ce67497.png'),(80,54,7,NULL,'Creatine Monohydrate',NULL,'CM001',1,1000.00,1000.00,'/uploads/7c7874e72fb198985455b971f11036a87.png'),(81,55,99,NULL,'Whey Blend ON',NULL,'SKU-WHEY-009',1,11000.00,11000.00,'/uploads/products/whey-blend.jpg'),(82,56,99,NULL,'Whey Blend ON',NULL,'SKU-WHEY-009',1,11000.00,11000.00,'/uploads/products/whey-blend.jpg'),(83,57,99,NULL,'Whey Blend ON',NULL,'SKU-WHEY-009',1,11000.00,11000.00,'/uploads/products/whey-blend.jpg'),(84,58,99,NULL,'Whey Blend ON',NULL,'SKU-WHEY-009',1,11000.00,11000.00,'/uploads/products/whey-blend.jpg'),(85,59,99,NULL,'Whey Blend ON',NULL,'SKU-WHEY-009',1,11000.00,11000.00,'/uploads/products/whey-blend.jpg'),(86,60,99,NULL,'Whey Blend ON',NULL,'SKU-WHEY-009',1,11000.00,11000.00,'/uploads/products/whey-blend.jpg'),(87,61,99,NULL,'Whey Blend ON',NULL,'SKU-WHEY-009',1,11000.00,11000.00,'/uploads/products/whey-blend.jpg'),(88,62,99,NULL,'Whey Blend ON',NULL,'SKU-WHEY-009',1,11000.00,11000.00,'/uploads/products/whey-blend.jpg'),(89,63,99,NULL,'Whey Blend ON',NULL,'SKU-WHEY-009',1,11000.00,11000.00,'/uploads/products/whey-blend.jpg'),(90,64,10,NULL,'Gym Belt',NULL,'GB001',1,945000.00,945000.00,'/uploads/aa6da57ebc3274231aff81e9fe2e1b6d.png');
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_number` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Mã đơn hàng: GS2024001',
  `user_id` int DEFAULT NULL,
  `customer_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customer_email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customer_phone` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `shipping_address` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `shipping_city` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `shipping_district` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `shipping_ward` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `shipping_postal_code` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `subtotal` decimal(12,2) NOT NULL COMMENT 'Tổng tiền hàng',
  `shipping_fee` decimal(10,2) DEFAULT '0.00',
  `tax_amount` decimal(10,2) DEFAULT '0.00',
  `discount_amount` decimal(10,2) DEFAULT '0.00',
  `total_amount` decimal(12,2) NOT NULL COMMENT 'Tổng thanh toán',
  `status` enum('pending','confirmed','processing','shipped','delivered','cancelled','refunded') COLLATE utf8mb4_unicode_ci DEFAULT 'pending',
  `payment_status` enum('pending','paid','failed','refunded') COLLATE utf8mb4_unicode_ci DEFAULT 'pending',
  `notes` text COLLATE utf8mb4_unicode_ci COMMENT 'Ghi chú từ khách hàng',
  `admin_notes` text COLLATE utf8mb4_unicode_ci COMMENT 'Ghi chú nội bộ',
  `discount_code` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `handled_by` int DEFAULT NULL COMMENT 'Admin xử lý đơn',
  `tracking_number` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `shipping_carrier` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `processing_at` timestamp NULL DEFAULT NULL,
  `order_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `confirmed_at` timestamp NULL DEFAULT NULL,
  `shipped_at` timestamp NULL DEFAULT NULL,
  `delivered_at` timestamp NULL DEFAULT NULL,
  `cancelled_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `order_number` (`order_number`),
  KEY `handled_by` (`handled_by`),
  KEY `idx_user` (`user_id`),
  KEY `idx_status` (`status`),
  KEY `idx_payment_status` (`payment_status`),
  KEY `idx_order_date` (`order_date`),
  KEY `idx_order_number` (`order_number`),
  KEY `idx_orders_user_status` (`user_id`,`status`,`order_date`),
  KEY `idx_tracking_number` (`tracking_number`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`handled_by`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,'GS20251001',NULL,'Nguyễn Văn A','user1@example.com','0901111111','123 Đường ABC','Hà Nội','Cầu Giấy','Yên Hòa','10000',3200000.00,50000.00,320000.00,100000.00,3250000.00,'delivered','paid','Giao nhanh',NULL,'SAVE10',NULL,NULL,NULL,NULL,'2025-10-01 03:00:00','2025-10-01 04:00:00','2025-10-02 02:00:00','2025-10-03 07:00:00',NULL,'2025-10-11 03:28:23'),(2,'GS20251002',NULL,'Trần Thị B','user2@example.com','0902222222','456 Đường XYZ','TP. HCM','Quận 1','Bến Nghé','70000',1400000.00,30000.00,140000.00,0.00,1430000.00,'shipped','paid',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-10-02 04:00:00','2025-10-02 05:00:00','2025-10-03 03:00:00',NULL,NULL,'2025-10-11 03:28:23'),(3,'GS20251003',3,'Lê Văn C','user3@example.com','0903333333','789 Đường DEF','Hà Nội','Ba Đình','Phúc Xá','10000',2700000.00,50000.00,270000.00,50000.00,2700000.00,'processing','pending','Kiểm tra hàng','Xử lý ưu tiên','BRONZE5',NULL,NULL,NULL,NULL,'2025-10-03 05:00:00',NULL,NULL,NULL,NULL,'2025-10-11 03:28:23'),(4,'GS20251004',4,'Phạm Thị D','user4@example.com','0904444444','101 Đường GHI','TP. HCM','Quận 3','Võ Thị Sáu','70000',1000000.00,30000.00,100000.00,0.00,1030000.00,'confirmed','paid',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-10-04 06:00:00','2025-10-04 07:00:00',NULL,NULL,NULL,'2025-10-11 03:28:23'),(5,'GS20251005',5,'Hoàng Văn E','user5@example.com','0905555555','202 Đường JKL','Hà Nội','Hoàn Kiếm','Hàng Bạc','10000',1600000.00,50000.00,160000.00,80000.00,1630000.00,'delivered','paid',NULL,NULL,'SILVER5',NULL,NULL,NULL,NULL,'2025-10-05 07:00:00','2025-10-05 08:00:00','2025-10-06 02:00:00','2025-10-07 07:00:00',NULL,'2025-10-11 03:28:23'),(6,'GS20251006',NULL,'Vũ Thị F','user6@example.com','0906666666','303 Đường MNO','TP. HCM','Quận 7','Tân Phú','70000',1200000.00,30000.00,120000.00,0.00,1230000.00,'pending','pending',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-10-06 08:00:00',NULL,NULL,NULL,NULL,'2025-10-11 03:28:23'),(7,'GS20251007',7,'Đặng Văn G','user7@example.com','0907777777','404 Đường PQR','Hà Nội','Thanh Xuân','Khương Đình','10000',2800000.00,50000.00,280000.00,224000.00,2856000.00,'cancelled','refunded','Hủy do hết hàng','Hoàn tiền','GOLD8',NULL,NULL,NULL,NULL,'2025-10-07 09:00:00','2025-10-07 10:00:00',NULL,NULL,'2025-10-08 02:00:00','2025-10-11 03:28:23'),(8,'GS20251008',8,'Bùi Thị H','user8@example.com','0908888888','505 Đường STU','TP. HCM','Bình Thạnh','Phú Thọ','70000',700000.00,30000.00,70000.00,0.00,730000.00,'shipped','paid',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-10-08 10:00:00','2025-10-08 11:00:00','2025-10-09 03:00:00',NULL,NULL,'2025-10-11 03:28:23'),(9,'GS20251009',9,'Ngô Văn I','user9@example.com','0909999999','606 Đường VWX','Hà Nội','Đống Đa','Quảng An','10000',700000.00,50000.00,70000.00,35000.00,705000.00,'shipped','paid',NULL,NULL,'REGULAR2',NULL,NULL,NULL,NULL,'2025-10-09 11:00:00',NULL,'2025-11-18 19:27:02',NULL,NULL,'2025-11-18 19:27:01'),(10,'GS20251010',10,'Lý Thị K','user10@example.com','0900000000','707 Đường YZ','TP. HCM','Quận 10','Tây Thạnh','70000',250000.00,30000.00,25000.00,0.00,280000.00,'confirmed','pending',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-10-10 12:00:00','2025-10-10 13:00:00',NULL,NULL,NULL,'2025-10-11 03:28:23'),(11,'GS20251011',11,'béo ','dongbeo16@gmail.com','0123456789','71 nguyễn lương bằng ','hanoi ','71 ','ưdw','70000',250000.00,30000.00,25000.00,0.00,280000.00,'confirmed','pending',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-10-25 18:34:53',NULL,NULL,NULL,NULL,'2025-10-25 18:34:53'),(12,'FN1762767834273333',NULL,'sdw','nguyenvinh1242004@gmail.com','Dd','d','Dd','Dd','DdD',NULL,280000.00,30000.00,0.00,0.00,310000.00,'pending','pending','d',NULL,NULL,NULL,NULL,NULL,NULL,'2025-11-10 09:43:54',NULL,NULL,NULL,NULL,'2025-11-10 09:43:54'),(13,'FN1762768070058868',NULL,'ưdwqf','dongbeo16@gmail.com','fdasf','fÀừ','fwÀ','FAFA','Ầ',NULL,280000.00,30000.00,0.00,0.00,310000.00,'pending','pending','À',NULL,NULL,NULL,NULL,NULL,NULL,'2025-11-10 09:47:50',NULL,NULL,NULL,NULL,'2025-11-10 09:47:50'),(14,'FN1762768097162781',NULL,'DTRW','dongbeo16@gmail.comfd','fdhff','wqfw','fwfỪ','ffA','Ff',NULL,280000.00,30000.00,0.00,0.00,310000.00,'pending','pending','fF',NULL,NULL,NULL,NULL,NULL,NULL,'2025-11-10 09:48:17',NULL,NULL,NULL,NULL,'2025-11-10 09:48:17'),(15,'FN1762793528832465',NULL,'wdqd','dongbeo16@gmail.comfd','wdwqd','d','d','ffA','Ff',NULL,280000.00,30000.00,0.00,0.00,310000.00,'pending','pending','',NULL,NULL,NULL,NULL,NULL,NULL,'2025-11-10 16:52:08',NULL,NULL,NULL,NULL,'2025-11-10 16:52:08'),(16,'FN1762794088115036',NULL,'o[','dongbeo16@gmail.com','0972068334','163 ','thnah hóa','hoằn hóa','hoằng cát',NULL,280000.00,30000.00,0.00,0.00,310000.00,'pending','pending','',NULL,'BRONZE5',NULL,NULL,NULL,NULL,'2025-11-10 17:01:28',NULL,NULL,NULL,NULL,'2025-11-10 17:01:28'),(17,'FN1762795416407334',NULL,'ưdwqf','dongbeo16@gmail.com','0972068334','163 ','Tỉnh Thanh Hóa','Huyện Hoằng Hóa','Xã Hoằng Cát',NULL,730000.00,30000.00,0.00,0.00,760000.00,'pending','pending','cD',NULL,NULL,NULL,NULL,NULL,NULL,'2025-11-10 17:23:36',NULL,NULL,NULL,NULL,'2025-11-10 17:23:36'),(18,'FN1762795864158087',NULL,'ưdwqf','dongbeo16@gmail.com','0972068334','163 ','Tỉnh Hà Giang','Huyện Đồng Văn','Xã Phố Cáo',NULL,730000.00,30000.00,0.00,0.00,760000.00,'pending','pending','',NULL,NULL,NULL,NULL,NULL,NULL,'2025-11-10 17:31:04',NULL,NULL,NULL,NULL,'2025-11-10 17:31:04'),(19,'FN1762796223740557',NULL,'ưdwqf','dongbeo16@gmail.com','0972068334','163 ','Tỉnh Quảng Ninh','Thị xã Quảng Yên','Phường Phong Cốc',NULL,730000.00,30000.00,0.00,0.00,760000.00,'confirmed','paid','',NULL,NULL,NULL,NULL,NULL,NULL,'2025-11-10 17:37:03','2025-11-10 17:50:17',NULL,NULL,NULL,'2025-11-10 17:50:16'),(20,'FN1762796865429250',NULL,'ưdwqf','dongbeo16@gmail.com','0972068334','163 ','Tỉnh Cao Bằng','Huyện Bảo Lạc','Xã Cốc Pàng',NULL,730000.00,30000.00,0.00,0.00,760000.00,'pending','pending','',NULL,NULL,NULL,NULL,NULL,NULL,'2025-11-10 17:47:45',NULL,NULL,NULL,NULL,'2025-11-10 17:47:45'),(21,'FN1762799061654574',NULL,'ưdwqf','dongbeo16@gmail.com','0972068334','163 ','Tỉnh Bắc Kạn','Huyện Pác Nặm','Xã Bộc Bố',NULL,730000.00,30000.00,0.00,0.00,760000.00,'pending','pending','',NULL,NULL,NULL,NULL,NULL,NULL,'2025-11-10 18:24:21',NULL,NULL,NULL,NULL,'2025-11-10 18:24:21'),(22,'FN1762832311910509',NULL,'ưdwqf','dongbeo16@gmail.com','0972068334','163 ','Tỉnh Hà Giang','Huyện Yên Minh','Xã Phú Lũng',NULL,1000.00,30000.00,0.00,0.00,31000.00,'pending','pending','',NULL,NULL,NULL,NULL,NULL,NULL,'2025-11-11 03:38:31',NULL,NULL,NULL,NULL,'2025-11-11 03:38:31'),(23,'FN1762832363697225',NULL,'ưdwqf','dongbeo16@gmail.com','0972068334','163 ','Tỉnh Quảng Ninh','Thành phố Móng Cái','Xã Vạn Ninh',NULL,1000.00,30000.00,0.00,0.00,31000.00,'pending','pending','',NULL,'FREESHIP',NULL,NULL,NULL,NULL,'2025-11-11 03:39:23',NULL,NULL,NULL,NULL,'2025-11-11 03:39:23'),(24,'FN1762832666759089',NULL,'ưdwqf','dongbeo16@gmail.com','0972068334','163 ','Tỉnh Phú Thọ','Huyện Tam Nông','Xã Thọ Văn',NULL,1000.00,30000.00,0.00,0.00,31000.00,'pending','pending','',NULL,'SAVE10',NULL,NULL,NULL,NULL,'2025-11-11 03:44:26',NULL,NULL,NULL,NULL,'2025-11-11 03:44:26'),(25,'FN1762836634161454',NULL,'rrfyhj','dongbeo16@gmail.com','0972068334','Nguyễn Lương Bằng','Thành phố Hà Nội','Quận Bắc Từ Liêm','Phường Xuân Tảo',NULL,1302000.00,30000.00,0.00,0.00,1332000.00,'pending','pending','',NULL,'SAVE10',NULL,NULL,NULL,NULL,'2025-11-11 04:50:34',NULL,NULL,NULL,NULL,'2025-11-11 04:50:34'),(26,'FN1762837077971953',NULL,'o[','dongbeo16@gmail.com','0972068334','Nguyễn Lương Bằng','Tỉnh Thái Nguyên','Huyện Phú Bình','',NULL,1000.00,30000.00,0.00,0.00,31000.00,'confirmed','paid','',NULL,NULL,NULL,NULL,NULL,NULL,'2025-11-11 04:57:57','2025-11-11 05:01:18',NULL,NULL,NULL,'2025-11-11 05:01:18'),(27,'FN1762861945101091',NULL,'rrfyhj','dongbeo16@gmail.com','0972068334','Nguyễn Lương Bằng','Tỉnh Hà Giang','Huyện Mèo Vạc','Xã Cán Chu Phìn',NULL,1000.00,30000.00,0.00,0.00,31000.00,'pending','pending','',NULL,'FREESHIP',NULL,NULL,NULL,NULL,'2025-11-11 11:52:25',NULL,NULL,NULL,NULL,'2025-11-11 11:52:25'),(28,'FN1762862069400732',NULL,'o[','dongbeo16@gmail.com','0972068334','Nguyễn Lương Bằng','Tỉnh Hoà Bình','Huyện Lương Sơn','Xã Liên Sơn',NULL,1000.00,30000.00,0.00,0.00,31000.00,'pending','pending','',NULL,'FREESHIP',NULL,NULL,NULL,NULL,'2025-11-11 11:54:29',NULL,NULL,NULL,NULL,'2025-11-11 11:54:29'),(29,'FN1762862112808840',NULL,'o[','dongbeo16@gmail.com','0972068334','Nguyễn Lương Bằng','Tỉnh Lai Châu','Huyện Mường Tè','Xã Bum Nưa',NULL,1000.00,30000.00,0.00,0.00,31000.00,'pending','pending','',NULL,'FREESHIP',NULL,NULL,NULL,NULL,'2025-11-11 11:55:12',NULL,NULL,NULL,NULL,'2025-11-11 11:55:12'),(30,'FN1762863654007153',NULL,'o[','dongbeo16@gmail.com','0972068334','Nguyễn Lương Bằng','Tỉnh Lạng Sơn','Huyện Chi Lăng','Xã Liên Sơn',NULL,1401000.00,30000.00,0.00,0.00,1431000.00,'pending','pending','',NULL,'SAVE10',NULL,NULL,NULL,NULL,'2025-11-11 12:20:54',NULL,NULL,NULL,NULL,'2025-11-11 12:20:54'),(31,'FN1762863688414531',NULL,'o[','dongbeo16@gma.com','0972068334','Nguyễn Lương Bằng','Tỉnh Sơn La','Huyện Sốp Cộp','Xã Mường Và',NULL,1401000.00,30000.00,0.00,0.00,1431000.00,'pending','pending','',NULL,NULL,NULL,NULL,NULL,NULL,'2025-11-11 12:21:28',NULL,NULL,NULL,NULL,'2025-11-11 12:21:28'),(32,'FN1762863788581811',NULL,'edw','dongbeo16@gmail.com','sadddsd','đDd','Tỉnh Quảng Ninh','Thị xã Quảng Yên','Xã Liên Hòa',NULL,1000.00,30000.00,0.00,0.00,31000.00,'pending','pending','',NULL,'FREESHIP',NULL,NULL,NULL,NULL,'2025-11-11 12:23:08',NULL,NULL,NULL,NULL,'2025-11-11 12:23:08'),(33,'FN1762863936384613',NULL,'cdfSHCDX','dongbeo16@gmail.com','0972068334','MHFN','Tỉnh Thái Nguyên','Huyện Phú Lương','Xã Yên Trạch',NULL,1200000.00,30000.00,0.00,0.00,1230000.00,'pending','pending','',NULL,'SAVE10',NULL,NULL,NULL,NULL,'2025-11-11 12:25:36',NULL,NULL,NULL,NULL,'2025-11-11 12:25:36'),(34,'FN1762863972368627',NULL,'TÊTJ','dongbeo16@gmail.com','YTJ','ÊJ','Tỉnh Lạng Sơn','Huyện Đình Lập','Xã Đồng Thắng',NULL,1200000.00,30000.00,0.00,0.00,1230000.00,'pending','pending','',NULL,'SAVE10',NULL,NULL,NULL,NULL,'2025-11-11 12:26:12',NULL,NULL,NULL,NULL,'2025-11-11 12:26:12'),(35,'FN1762865036822719',NULL,'ddDd','dongbeo16@gmail.com','sadaD','DDdDd','Tỉnh Thái Nguyên','Thành phố Phổ Yên','Phường Tân Phú',NULL,1200000.00,30000.00,0.00,0.00,1230000.00,'pending','pending','',NULL,NULL,NULL,NULL,NULL,NULL,'2025-11-11 12:43:56',NULL,NULL,NULL,NULL,'2025-11-11 12:43:56'),(36,'FN1762865343285214',NULL,'tdjhdah','dongbeo16@gmail.com','0485447878484','qa','Tỉnh Sơn La','Huyện Yên Châu','Xã Mường Lựm',NULL,1200000.00,30000.00,0.00,0.00,1230000.00,'pending','pending','',NULL,'SAVE10',NULL,NULL,NULL,NULL,'2025-11-11 12:49:03',NULL,NULL,NULL,NULL,'2025-11-11 12:49:03'),(37,'FN1762865596869153',NULL,'xdDsa','dongbeo16@gmail.com','0123456788','dSDadD','Tỉnh Tuyên Quang','Huyện Yên Sơn','Xã Tân Tiến',NULL,1200000.00,30000.00,0.00,0.00,1230000.00,'pending','pending','',NULL,NULL,NULL,NULL,NULL,NULL,'2025-11-11 12:53:16',NULL,NULL,NULL,NULL,'2025-11-11 12:53:16'),(38,'FN1762925587461447',NULL,'o[','dongbeo16@gmail.com','0972068334','Nguyễn Lương Bằng','Tỉnh Hà Giang','Huyện Đồng Văn','Xã Sảng Tủng',NULL,1350000.00,30000.00,0.00,135000.00,1245000.00,'pending','pending','',NULL,'SAVE10',NULL,NULL,NULL,NULL,'2025-11-12 05:33:07',NULL,NULL,NULL,NULL,'2025-11-12 05:33:07'),(39,'FN1762925656903936',NULL,'gsgsdhg','dongbeo16@gmail.com','425235325425','hfdhfh','Tỉnh Hoà Bình','Huyện Tân Lạc','Xã Đông Lai',NULL,1350000.00,30000.00,0.00,67500.00,1312500.00,'pending','pending','',NULL,'BRONZE5',NULL,NULL,NULL,NULL,'2025-11-12 05:34:16',NULL,NULL,NULL,NULL,'2025-11-12 05:34:16'),(40,'FN1762926548224987',NULL,'o[','dongbeo16@gmail.com','0972068334','Nguyễn Lương Bằng','Tỉnh Yên Bái','Huyện Văn Chấn','Xã Suối Giàng',NULL,1350000.00,30000.00,0.00,135000.00,1245000.00,'pending','pending','',NULL,'SAVE10',NULL,NULL,NULL,NULL,'2025-11-12 05:49:08',NULL,NULL,NULL,NULL,'2025-11-12 05:49:08'),(41,'FN1762926948828674',NULL,'o[','dongbeo16@gmail.com','0972068334','Nguyễn Lương Bằng','Tỉnh Bắc Giang','Huyện Hiệp Hòa','Thị trấn Bắc Lý',NULL,1350000.00,30000.00,0.00,135000.00,1245000.00,'pending','pending','',NULL,'SAVE10',NULL,NULL,NULL,NULL,'2025-11-12 05:55:48',NULL,NULL,NULL,NULL,'2025-11-12 05:55:48'),(42,'FN1762996876876276',NULL,'o[','dongbeo16@gmail.com','0972068334','Nguyễn Lương Bằng','Thành phố Hà Nội','Quận Nam Từ Liêm','Phường Xuân Phương',NULL,180000.00,0.00,0.00,27000.00,153000.00,'pending','pending','',NULL,'VIP15',NULL,NULL,NULL,NULL,'2025-11-13 01:21:16',NULL,NULL,NULL,NULL,'2025-11-13 01:21:16'),(43,'FN1762996914051547',NULL,'o[','dongbeo16@gmail.com','0972068334','Nguyễn Lương Bằng','Tỉnh Phú Thọ','Huyện Cẩm Khê','Xã Nhật Tiến',NULL,180000.00,0.00,0.00,9000.00,171000.00,'pending','pending','',NULL,'BRONZE5',NULL,NULL,NULL,NULL,'2025-11-13 01:21:54',NULL,NULL,NULL,NULL,'2025-11-13 01:21:54'),(44,'FN1763005732697221',NULL,'o[','dongbeo16@gmail.com','0972068334','Nguyễn Lương Bằng','Tỉnh Bắc Ninh','Thị xã Thuận Thành','Xã Ngũ Thái',NULL,180000.00,0.00,0.00,18000.00,162000.00,'pending','pending','',NULL,'SAVE10',NULL,NULL,NULL,NULL,'2025-11-13 03:48:52',NULL,NULL,NULL,NULL,'2025-11-13 03:48:52'),(45,'FN1763006044349851',NULL,'fesaf','dongbeo16@gmail.com','0972068334','ádgfsghdjn','Tỉnh Cao Bằng','Huyện Hà Quảng','Xã Thanh Long',NULL,180000.00,0.00,0.00,18000.00,162000.00,'pending','pending','',NULL,'SAVE10',NULL,NULL,NULL,NULL,'2025-11-13 03:54:04',NULL,NULL,NULL,NULL,'2025-11-13 03:54:04'),(46,'FN1763006242259844',NULL,'o[','dongbeo16@gmail.com','0972068334','Nguyễn Lương Bằng','Tỉnh Thái Nguyên','Huyện Định Hóa','Xã Trung Hội',NULL,180000.00,0.00,0.00,9000.00,171000.00,'pending','pending','',NULL,'BRONZE5',NULL,NULL,NULL,NULL,'2025-11-13 03:57:22',NULL,NULL,NULL,NULL,'2025-11-13 03:57:22'),(47,'FN1763006695234828',NULL,'o[','dongbeo16@gmail.com','0972068334','Nguyễn Lương Bằng','Tỉnh Điện Biên','Huyện Tủa Chùa','Xã Huổi Só',NULL,180000.00,0.00,0.00,0.00,180000.00,'pending','pending','',NULL,NULL,NULL,NULL,NULL,NULL,'2025-11-13 04:04:55',NULL,NULL,NULL,NULL,'2025-11-13 04:04:55'),(48,'FN1763283566730912',14,'DdSADSdsd','dongbeo16@gmail.com','212544189545','sDƯrdfwsFDsf','Tỉnh Quảng Ninh','Huyện Vân Đồn','Xã Bản Sen',NULL,1801000.00,0.00,0.00,180100.00,1620900.00,'cancelled','pending','',NULL,'SAVE10',NULL,NULL,NULL,NULL,'2025-11-16 08:59:26',NULL,NULL,NULL,'2025-11-16 12:12:24','2025-11-16 12:12:24'),(49,'FN1763283652853854',14,'sdƯDWfwf','dongbeo16@gmail.com','hdtjd','dhd','Thành phố Hà Nội','Huyện Gia Lâm','Xã Kiêu Kỵ',NULL,3201000.00,0.00,0.00,320100.00,2880900.00,'cancelled','pending','',NULL,'SAVE10',NULL,NULL,NULL,NULL,'2025-11-16 09:00:52',NULL,NULL,NULL,'2025-11-16 12:12:38','2025-11-16 12:12:38'),(50,'FN1763284209757235',14,'sdƯDWfwf','dongbeo16@gmail.com','hdtjd','dhd','Tỉnh Bắc Giang','Huyện Yên Thế','Xã Đồng Kỳ',NULL,3201000.00,0.00,0.00,480150.00,2720850.00,'cancelled','pending','',NULL,'VIP15',NULL,NULL,NULL,NULL,'2025-11-16 09:10:09',NULL,NULL,NULL,'2025-11-16 12:14:12','2025-11-16 12:14:12'),(51,'FN1763287966108203',14,'sdƯDWfwf','dongbeo16@gmail.com','hdtjd','dhd','Tỉnh Lạng Sơn','Huyện Lộc Bình','Xã Hữu Lân',NULL,4401000.00,0.00,0.00,0.00,4401000.00,'pending','pending','',NULL,NULL,NULL,NULL,NULL,NULL,'2025-11-16 10:12:46',NULL,NULL,NULL,NULL,'2025-11-16 10:12:46'),(52,'FN1763289735705073',14,'sdƯDWfwf','dongbeo16@gmail.com','hdtjd','dhd','Tỉnh Tuyên Quang','Huyện Lâm Bình','Xã Xuân Lập',NULL,6201000.00,0.00,0.00,620100.00,5580900.00,'pending','pending','',NULL,'SAVE10',NULL,NULL,NULL,NULL,'2025-11-16 10:42:15',NULL,NULL,NULL,NULL,'2025-11-16 10:42:15'),(53,'FN1763289882806573',14,'sdƯDWfwf','dongbeo16@gmail.com','hdtjd','dhd','Tỉnh Lạng Sơn','Huyện Đình Lập','Xã Cường Lợi',NULL,6201000.00,0.00,0.00,620100.00,5580900.00,'pending','pending','',NULL,'SAVE10',NULL,NULL,NULL,NULL,'2025-11-16 10:44:42',NULL,NULL,NULL,NULL,'2025-11-16 10:44:42'),(54,'FN1763290168883315',14,'sdƯDWfwf','dongbeo16@gmail.com','hdtjd','dhd','Tỉnh Phú Thọ','Huyện Thanh Sơn','Xã Hương Cần',NULL,1000.00,0.00,0.00,150.00,850.00,'cancelled','pending','',NULL,'VIP15',NULL,NULL,NULL,NULL,'2025-11-16 10:49:28',NULL,NULL,NULL,'2025-11-16 12:12:11','2025-11-16 12:12:10'),(55,'FN1763290386166090',14,'sdƯDWfwf','dongbeo16@gmail.com','hdtjd','dhd','Tỉnh Sơn La','Huyện Thuận Châu','Xã Phổng Lái',NULL,11000.00,0.00,0.00,0.00,11000.00,'pending','pending','',NULL,NULL,NULL,NULL,NULL,NULL,'2025-11-16 10:53:06',NULL,NULL,NULL,NULL,'2025-11-16 10:53:06'),(56,'FN1763290981049653',14,'sdƯDWfwf','dongbeo16@gmail.com','hdtjd','dhd','Tỉnh Hoà Bình','Huyện Lương Sơn','Xã Lâm Sơn',NULL,11000.00,0.00,0.00,0.00,11000.00,'pending','pending','',NULL,NULL,NULL,NULL,NULL,NULL,'2025-11-16 11:03:01',NULL,NULL,NULL,NULL,'2025-11-16 11:03:01'),(57,'FN1763292707033546',14,'dqefqefqefqf','dongbeo16@gmail.com','dw','qedwq','Tỉnh Phú Thọ','Huyện Tam Nông','Xã Quang Húc',NULL,11000.00,0.00,0.00,0.00,11000.00,'confirmed','paid','',NULL,NULL,NULL,NULL,NULL,NULL,'2025-11-16 11:31:47','2025-11-16 11:41:13',NULL,NULL,NULL,'2025-11-16 11:41:13'),(58,'FN1763293809451457',14,'dâfafa','dongbeo16@gmail.com','0154542125','sưqdwqdq','Tỉnh Lạng Sơn','Huyện Hữu Lũng','Xã Cai Kinh',NULL,11000.00,0.00,0.00,0.00,11000.00,'confirmed','paid','',NULL,NULL,NULL,NULL,NULL,NULL,'2025-11-16 11:50:09','2025-11-16 11:50:50',NULL,NULL,NULL,'2025-11-16 11:50:49'),(59,'FN1763406799816520',14,'fdghj','dongbeo16@gmail.com','012545266565','dghugdrdytyg','Tỉnh Quảng Ninh','Huyện Vân Đồn','Xã Đông Xá',NULL,11000.00,0.00,0.00,0.00,11000.00,'confirmed','paid','',NULL,NULL,NULL,NULL,NULL,NULL,'2025-11-17 19:13:19','2025-11-17 19:15:00',NULL,NULL,NULL,'2025-11-17 19:15:00'),(60,'FN1763407201357600',18,'dfghj','dongbeo16@gmail.com','0123545465','dhfcgjh','Tỉnh Sơn La','Huyện Mai Sơn','Xã Chiềng Nơi',NULL,11000.00,0.00,0.00,0.00,11000.00,'confirmed','paid','',NULL,NULL,NULL,NULL,NULL,NULL,'2025-11-17 19:20:01','2025-11-17 19:20:32',NULL,NULL,NULL,'2025-11-17 19:20:32'),(61,'FN1763407531494231',18,'htdghdhsdf','dongbeo16@gmail.com','0152598545','sfadf','Tỉnh Bắc Giang','Huyện Lục Nam','Xã Nghĩa Phương',NULL,11000.00,0.00,0.00,0.00,11000.00,'confirmed','paid','',NULL,NULL,NULL,NULL,NULL,NULL,'2025-11-17 19:25:31','2025-11-17 19:26:02',NULL,NULL,NULL,'2025-11-17 19:26:02'),(62,'FN1763407816205734',18,'ưewwqe','dongbeo16@gmail.com','012345798','ewqwqew','Tỉnh Bắc Giang','Huyện Lục Nam','Xã Vô Tranh',NULL,11000.00,0.00,0.00,0.00,11000.00,'pending','pending','',NULL,NULL,NULL,NULL,NULL,NULL,'2025-11-17 19:30:16',NULL,NULL,NULL,NULL,'2025-11-17 19:30:16'),(63,'FN1763408072945889',14,'fwfwfdw','fjfdnj@gmai.com','èqwefwqf','qưefwqf','Thành phố Hà Nội','Huyện Thanh Trì','Xã Ngọc Hồi',NULL,11000.00,0.00,0.00,0.00,11000.00,'delivered','paid','',NULL,NULL,NULL,NULL,NULL,NULL,'2025-11-17 19:34:32','2025-11-17 19:35:44','2025-11-18 19:22:28','2025-11-18 19:27:11',NULL,'2025-11-18 19:27:11'),(64,'FN1763557876538359',18,'sdfgyhjk','nguyenvinh1242004@gmail.com','015562626','dfghjk','Tỉnh Tuyên Quang','Huyện Chiêm Hóa','Xã Phúc Sơn',NULL,945000.00,0.00,0.00,0.00,945000.00,'pending','pending','',NULL,NULL,NULL,NULL,NULL,NULL,'2025-11-19 13:11:16',NULL,NULL,NULL,NULL,'2025-11-19 13:11:16');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `payment_method` enum('cod','bank_transfer','credit_card','e_wallet','momo','zalopay') COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` decimal(12,2) NOT NULL,
  `currency` varchar(3) COLLATE utf8mb4_unicode_ci DEFAULT 'VND',
  `transaction_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Mã giao dịch từ payment gateway',
  `gateway_response` json DEFAULT NULL COMMENT 'Response từ payment gateway',
  `status` enum('pending','processing','completed','failed','cancelled','refunded') COLLATE utf8mb4_unicode_ci DEFAULT 'pending',
  `payment_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `completed_at` timestamp NULL DEFAULT NULL,
  `failed_at` timestamp NULL DEFAULT NULL,
  `notes` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`),
  KEY `idx_order` (`order_id`),
  KEY `idx_status` (`status`),
  KEY `idx_transaction` (`transaction_id`),
  CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
INSERT INTO `payments` VALUES (1,1,'momo',3250000.00,'VND','TXN001','{\"status\": \"success\"}','completed','2025-10-01 03:00:00','2025-10-01 03:05:00',NULL,NULL),(2,2,'cod',1430000.00,'VND',NULL,NULL,'pending','2025-10-02 04:00:00',NULL,NULL,'Thanh toán khi nhận hàng'),(3,3,'credit_card',2700000.00,'VND','TXN002','{\"status\": \"success\"}','completed','2025-10-03 05:00:00','2025-10-03 05:05:00',NULL,NULL),(4,4,'zalopay',1030000.00,'VND','TXN003','{\"status\": \"success\"}','completed','2025-10-04 06:00:00','2025-10-04 06:05:00',NULL,NULL),(5,5,'bank_transfer',1630000.00,'VND','TXN004','{\"status\": \"success\"}','completed','2025-10-05 07:00:00','2025-10-05 07:05:00',NULL,NULL),(6,6,'cod',1230000.00,'VND',NULL,NULL,'pending','2025-10-06 08:00:00',NULL,NULL,'COD'),(7,7,'momo',2856000.00,'VND','TXN005','{\"status\": \"refunded\"}','refunded','2025-10-07 09:00:00',NULL,NULL,'Hoàn tiền do hủy'),(8,8,'credit_card',730000.00,'VND','TXN006','{\"status\": \"success\"}','completed','2025-10-08 10:00:00','2025-10-08 10:05:00',NULL,NULL),(9,9,'zalopay',705000.00,'VND','TXN007','{\"status\": \"success\"}','completed','2025-10-09 11:00:00','2025-10-09 11:05:00',NULL,NULL),(10,10,'bank_transfer',280000.00,'VND','TXN008','{\"status\": \"pending\"}','processing','2025-10-10 12:00:00',NULL,NULL,'Chờ xác nhận chuyển khoản'),(11,19,'bank_transfer',760000.00,'VND','29550270','{\"id\": \"29550270\", \"amount_in\": \"760000.00\", \"transaction_date\": \"2025-11-10T17:50:16.748Z\", \"transaction_content\": \"Manual confirmation for FN1762796223740557\"}','completed','2025-11-10 17:50:16','2025-11-10 17:50:17',NULL,NULL),(12,26,'bank_transfer',31000.00,'VND','30037936','{\"id\": \"30037936\", \"code\": null, \"amount_in\": \"31000.00\", \"amount_out\": \"0.00\", \"accumulated\": \"0.00\", \"sub_account\": null, \"account_number\": \"0972068334\", \"bank_account_id\": \"32751\", \"bank_brand_name\": \"VPBank\", \"reference_number\": \"FT25315240904060\", \"transaction_date\": \"2025-11-11 11:59:00\", \"transaction_content\": \"NHAN TU 1039667616 TRACE 943650 ND MBVCB.11680098353.5315BFTVG2FSMUDP. FN1762837077971953.CT tu 1039667616 NGUYEN VAN DONG toi 0972068334 NGUYEN VAN DONG tai VPBANK\"}','completed','2025-11-11 04:59:58','2025-11-11 04:59:59',NULL,NULL),(13,26,'bank_transfer',31000.00,'VND','30037936','{\"id\": \"30037936\", \"code\": null, \"amount_in\": \"31000.00\", \"amount_out\": \"0.00\", \"accumulated\": \"0.00\", \"sub_account\": null, \"account_number\": \"0972068334\", \"bank_account_id\": \"32751\", \"bank_brand_name\": \"VPBank\", \"reference_number\": \"FT25315240904060\", \"transaction_date\": \"2025-11-11 11:59:00\", \"transaction_content\": \"NHAN TU 1039667616 TRACE 943650 ND MBVCB.11680098353.5315BFTVG2FSMUDP. FN1762837077971953.CT tu 1039667616 NGUYEN VAN DONG toi 0972068334 NGUYEN VAN DONG tai VPBANK\"}','completed','2025-11-11 05:00:18','2025-11-11 05:00:18',NULL,NULL),(14,26,'bank_transfer',31000.00,'VND','30037936','{\"id\": \"30037936\", \"code\": null, \"amount_in\": \"31000.00\", \"amount_out\": \"0.00\", \"accumulated\": \"0.00\", \"sub_account\": null, \"account_number\": \"0972068334\", \"bank_account_id\": \"32751\", \"bank_brand_name\": \"VPBank\", \"reference_number\": \"FT25315240904060\", \"transaction_date\": \"2025-11-11 11:59:00\", \"transaction_content\": \"NHAN TU 1039667616 TRACE 943650 ND MBVCB.11680098353.5315BFTVG2FSMUDP. FN1762837077971953.CT tu 1039667616 NGUYEN VAN DONG toi 0972068334 NGUYEN VAN DONG tai VPBANK\"}','completed','2025-11-11 05:00:28','2025-11-11 05:00:28',NULL,NULL),(15,26,'bank_transfer',31000.00,'VND','30037936','{\"id\": \"30037936\", \"code\": null, \"amount_in\": \"31000.00\", \"amount_out\": \"0.00\", \"accumulated\": \"0.00\", \"sub_account\": null, \"account_number\": \"0972068334\", \"bank_account_id\": \"32751\", \"bank_brand_name\": \"VPBank\", \"reference_number\": \"FT25315240904060\", \"transaction_date\": \"2025-11-11 11:59:00\", \"transaction_content\": \"NHAN TU 1039667616 TRACE 943650 ND MBVCB.11680098353.5315BFTVG2FSMUDP. FN1762837077971953.CT tu 1039667616 NGUYEN VAN DONG toi 0972068334 NGUYEN VAN DONG tai VPBANK\"}','completed','2025-11-11 05:00:38','2025-11-11 05:00:38',NULL,NULL),(16,26,'bank_transfer',31000.00,'VND','30037936','{\"id\": \"30037936\", \"code\": null, \"amount_in\": \"31000.00\", \"amount_out\": \"0.00\", \"accumulated\": \"0.00\", \"sub_account\": null, \"account_number\": \"0972068334\", \"bank_account_id\": \"32751\", \"bank_brand_name\": \"VPBank\", \"reference_number\": \"FT25315240904060\", \"transaction_date\": \"2025-11-11 11:59:00\", \"transaction_content\": \"NHAN TU 1039667616 TRACE 943650 ND MBVCB.11680098353.5315BFTVG2FSMUDP. FN1762837077971953.CT tu 1039667616 NGUYEN VAN DONG toi 0972068334 NGUYEN VAN DONG tai VPBANK\"}','completed','2025-11-11 05:00:47','2025-11-11 05:00:48',NULL,NULL),(17,26,'bank_transfer',31000.00,'VND','30037936','{\"id\": \"30037936\", \"code\": null, \"amount_in\": \"31000.00\", \"amount_out\": \"0.00\", \"accumulated\": \"0.00\", \"sub_account\": null, \"account_number\": \"0972068334\", \"bank_account_id\": \"32751\", \"bank_brand_name\": \"VPBank\", \"reference_number\": \"FT25315240904060\", \"transaction_date\": \"2025-11-11 11:59:00\", \"transaction_content\": \"NHAN TU 1039667616 TRACE 943650 ND MBVCB.11680098353.5315BFTVG2FSMUDP. FN1762837077971953.CT tu 1039667616 NGUYEN VAN DONG toi 0972068334 NGUYEN VAN DONG tai VPBANK\"}','completed','2025-11-11 05:00:58','2025-11-11 05:00:58',NULL,NULL),(18,26,'bank_transfer',31000.00,'VND','30037936','{\"id\": \"30037936\", \"code\": null, \"amount_in\": \"31000.00\", \"amount_out\": \"0.00\", \"accumulated\": \"0.00\", \"sub_account\": null, \"account_number\": \"0972068334\", \"bank_account_id\": \"32751\", \"bank_brand_name\": \"VPBank\", \"reference_number\": \"FT25315240904060\", \"transaction_date\": \"2025-11-11 11:59:00\", \"transaction_content\": \"NHAN TU 1039667616 TRACE 943650 ND MBVCB.11680098353.5315BFTVG2FSMUDP. FN1762837077971953.CT tu 1039667616 NGUYEN VAN DONG toi 0972068334 NGUYEN VAN DONG tai VPBANK\"}','completed','2025-11-11 05:01:08','2025-11-11 05:01:09',NULL,NULL),(19,26,'bank_transfer',31000.00,'VND','30037936','{\"id\": \"30037936\", \"code\": null, \"amount_in\": \"31000.00\", \"amount_out\": \"0.00\", \"accumulated\": \"0.00\", \"sub_account\": null, \"account_number\": \"0972068334\", \"bank_account_id\": \"32751\", \"bank_brand_name\": \"VPBank\", \"reference_number\": \"FT25315240904060\", \"transaction_date\": \"2025-11-11 11:59:00\", \"transaction_content\": \"NHAN TU 1039667616 TRACE 943650 ND MBVCB.11680098353.5315BFTVG2FSMUDP. FN1762837077971953.CT tu 1039667616 NGUYEN VAN DONG toi 0972068334 NGUYEN VAN DONG tai VPBANK\"}','completed','2025-11-11 05:01:18','2025-11-11 05:01:18',NULL,NULL),(20,57,'bank_transfer',11000.00,'VND','30899132','{\"id\": \"30899132\", \"code\": null, \"amount_in\": \"11000.00\", \"amount_out\": \"0.00\", \"accumulated\": \"0.00\", \"sub_account\": null, \"account_number\": \"0972068334\", \"bank_account_id\": \"32751\", \"bank_brand_name\": \"VPBank\", \"reference_number\": \"FT25321024015539\", \"transaction_date\": \"2025-11-16 18:41:00\", \"transaction_content\": \"NHAN TU 1039667616 TRACE 706599 ND MBVCB.11760094814.5320BFTVG2JMJKB8. FN1763292707033546.CT tu 1039667616 NGUYEN VAN DONG toi 0972068334 NGUYEN VAN DONG tai VPBANK\"}','completed','2025-11-16 11:41:13','2025-11-16 11:41:13',NULL,NULL),(21,58,'bank_transfer',11000.00,'VND','30900602','{\"id\": \"30900602\", \"code\": null, \"amount_in\": \"11000.00\", \"amount_out\": \"0.00\", \"accumulated\": \"0.00\", \"sub_account\": null, \"account_number\": \"0972068334\", \"bank_account_id\": \"32751\", \"bank_brand_name\": \"VPBank\", \"reference_number\": \"FT25321515102925\", \"transaction_date\": \"2025-11-16 18:50:00\", \"transaction_content\": \"NHAN TU 1039667616 TRACE 809535 ND MBVCB.11760248615.5320BFTVG2JMT3ES. FN1763293809451457.CT tu 1039667616 NGUYEN VAN DONG toi 0972068334 NGUYEN VAN DONG tai VPBANK\"}','completed','2025-11-16 11:50:49','2025-11-16 11:50:50',NULL,NULL),(22,59,'bank_transfer',11000.00,'VND','31114921','{\"id\": \"31114921\", \"code\": null, \"amount_in\": \"11000.00\", \"amount_out\": \"0.00\", \"accumulated\": \"0.00\", \"sub_account\": null, \"account_number\": \"0972068334\", \"bank_account_id\": \"32751\", \"bank_brand_name\": \"VPBank\", \"reference_number\": \"FT25322933292843\", \"transaction_date\": \"2025-11-18 02:14:00\", \"transaction_content\": \"NHAN TU 1039667616 TRACE 442211 ND MBVCB.11778107650.5322BFTVG2JJR1V5. FN1763406799816520.CT tu 1039667616 NGUYEN VAN DONG toi 0972068334 NGUYEN VAN DONG tai VPBANK\"}','completed','2025-11-17 19:15:00','2025-11-17 19:15:00',NULL,NULL),(23,60,'bank_transfer',11000.00,'VND','31115075','{\"id\": \"31115075\", \"code\": null, \"amount_in\": \"11000.00\", \"amount_out\": \"0.00\", \"accumulated\": \"0.00\", \"sub_account\": null, \"account_number\": \"0972068334\", \"bank_account_id\": \"32751\", \"bank_brand_name\": \"VPBank\", \"reference_number\": \"FT25322280761508\", \"transaction_date\": \"2025-11-18 02:20:00\", \"transaction_content\": \"NHAN TU 1039667616 TRACE 446656 ND MBVCB.11778116410.5322BFTVG2JJR82R. FN1763407201357600.CT tu 1039667616 NGUYEN VAN DONG toi 0972068334 NGUYEN VAN DONG tai VPBANK\"}','completed','2025-11-17 19:20:32','2025-11-17 19:20:32',NULL,NULL),(24,61,'bank_transfer',11000.00,'VND','31115241','{\"id\": \"31115241\", \"code\": null, \"amount_in\": \"11000.00\", \"amount_out\": \"0.00\", \"accumulated\": \"0.00\", \"sub_account\": null, \"account_number\": \"0972068334\", \"bank_account_id\": \"32751\", \"bank_brand_name\": \"VPBank\", \"reference_number\": \"FT25322063040200\", \"transaction_date\": \"2025-11-18 02:25:00\", \"transaction_content\": \"NHAN TU 1039667616 TRACE 450957 ND MBVCB.11778112569.5322BFTVG2JJRJTG. FN1763407531494231.CT tu 1039667616 NGUYEN VAN DONG toi 0972068334 NGUYEN VAN DONG tai VPBANK\"}','completed','2025-11-17 19:26:02','2025-11-17 19:26:02',NULL,NULL),(25,63,'bank_transfer',11000.00,'VND','31115489','{\"id\": \"31115489\", \"code\": null, \"amount_in\": \"11000.00\", \"amount_out\": \"0.00\", \"accumulated\": \"0.00\", \"sub_account\": null, \"account_number\": \"0972068334\", \"bank_account_id\": \"32751\", \"bank_brand_name\": \"VPBank\", \"reference_number\": \"FT25322658035530\", \"transaction_date\": \"2025-11-18 02:35:00\", \"transaction_content\": \"NHAN TU 1039667616 TRACE 458479 ND MBVCB.11778136674.5322BFTVG2JJR4FK. FN1763408072945889.CT tu 1039667616 NGUYEN VAN DONG toi 0972068334 NGUYEN VAN DONG tai VPBANK\"}','completed','2025-11-17 19:35:43','2025-11-17 19:35:44',NULL,NULL);
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_attributes`
--

DROP TABLE IF EXISTS `product_attributes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_attributes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `attribute_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'serving_size, protein_per_serving, calories',
  `attribute_value` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `unit` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'g, mg, kcal, %',
  `sort_order` int DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `idx_product` (`product_id`),
  KEY `idx_name` (`attribute_name`),
  CONSTRAINT `product_attributes_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_attributes`
--

LOCK TABLES `product_attributes` WRITE;
/*!40000 ALTER TABLE `product_attributes` DISABLE KEYS */;
INSERT INTO `product_attributes` VALUES (3,2,'serving_size','30g','g',1),(4,2,'absorption_rate','Fast','%',2),(5,3,'calories_per_serving','650','kcal',1),(6,3,'carbs','125g','g',2),(7,4,'caffeine_content','150mg','mg',1),(8,4,'beta_alanine','1.6g','g',2),(9,5,'leucine','3g','g',1),(10,5,'total_bcaa','6g','g',2);
/*!40000 ALTER TABLE `product_attributes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_images`
--

DROP TABLE IF EXISTS `product_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `imageUrl` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `productId` int NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `sortOrder` int DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `productId` (`productId`),
  CONSTRAINT `product_images_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=139 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_images`
--

LOCK TABLES `product_images` WRITE;
/*!40000 ALTER TABLE `product_images` DISABLE KEYS */;
INSERT INTO `product_images` VALUES (1,'/uploads/96495b7c41018769078a5587af2c5b1dc.png',92,'2025-11-18 13:28:19','2025-11-18 13:28:19',0),(2,'/uploads/bd5d33210a775ab5803c7580d38b17153.png',92,'2025-11-18 13:28:19','2025-11-18 13:28:19',1),(3,'/uploads/c97dac507c2510c57fe3c10a451b82cc24.png',92,'2025-11-18 13:28:19','2025-11-18 13:28:19',2),(4,'/uploads/7bca10b639b0ca4ea1e011624bc68f010a.png',92,'2025-11-18 13:28:19','2025-11-18 13:28:19',3),(5,'/uploads/4ae3c69c48a0bd50c9762c2334785bf7.png',92,'2025-11-18 13:28:19','2025-11-18 13:28:19',4),(23,'/uploads/2235137eda78e59d7dd4ac1e2dcaa720.png',101,'2025-11-18 14:47:25','2025-11-18 14:47:25',0),(24,'/uploads/e29bfa7544f4da62146c71e47fa84825.jpg',101,'2025-11-18 14:47:25','2025-11-18 14:47:25',1),(25,'/uploads/4883d28549d8ce1097dbc126443f8e8e2.jpg',101,'2025-11-18 14:47:25','2025-11-18 14:47:25',2),(26,'/uploads/9d37841aad97bfe4203bf882f9a3118a.png',101,'2025-11-18 14:47:25','2025-11-18 14:47:25',3),(27,'/uploads/610512abf6e1b9c5dc550a4a945710e010b.jpg',101,'2025-11-18 14:47:25','2025-11-18 14:47:25',4),(28,'/uploads/939fb3c08b8d876b824e210c7aed638a5.JPG',101,'2025-11-18 14:47:25','2025-11-18 14:47:25',5),(29,'/uploads/eb5c89e7efc1c2f18f93b5f78e666fd1.jpg',6,'2025-11-18 16:28:28','2025-11-18 16:28:28',0),(30,'/uploads/9d376285f55550bd9d2683a3bb86e608.jpg',99,'2025-11-19 06:07:39','2025-11-19 06:07:39',0),(31,'/uploads/47127100108f7910d4face4f187767101c3b.jpg',99,'2025-11-19 06:07:39','2025-11-19 06:07:39',1),(32,'/uploads/319f3788e6e91ee4591a4f47fc6b4ed8.jpg',99,'2025-11-19 06:07:40','2025-11-19 06:07:40',2),(33,'/uploads/04f415e9356fd74215e6f8c772fa3a7f.png',99,'2025-11-19 06:07:40','2025-11-19 06:07:40',3),(34,'/uploads/f70462ad168c6ff3563b81b969c3834c.png',99,'2025-11-19 06:07:40','2025-11-19 06:07:40',4),(35,'/uploads/32446ba719924d49bc0966efd7291073c.png',99,'2025-11-19 06:07:40','2025-11-19 06:07:40',5),(36,'/uploads/6081067f309fa7021b326897434607535.png',99,'2025-11-19 06:07:40','2025-11-19 06:07:40',6),(37,'/uploads/910a38b484f6d78cbf8bc3b5b697a7393.png',99,'2025-11-19 06:07:40','2025-11-19 06:07:40',7),(38,'/uploads/1bf1028f7fe108d3545fe73a26104dfce6a.jpg',99,'2025-11-19 06:07:40','2025-11-19 06:07:40',8),(39,'/uploads/4810a43afb54da5a1bb69610c43a70cf0.jpg',99,'2025-11-19 06:07:40','2025-11-19 06:07:40',9),(40,'/uploads/3ffff3106210e5ec8fe25d9189f1084e203.png',99,'2025-11-19 06:07:40','2025-11-19 06:07:40',10),(41,'/uploads/4b6211f63825c43f1b6d210e879e6d1a1.png',99,'2025-11-19 06:07:40','2025-11-19 06:07:40',11),(42,'/uploads/b46952817f1108ce819e4c2c4d4ec975a.png',99,'2025-11-19 06:07:40','2025-11-19 06:07:40',12),(43,'/uploads/db6daa59d752ba47110c6d140e81fa7e8.png',99,'2025-11-19 06:07:40','2025-11-19 06:07:40',13),(44,'/uploads/fce0248064ab88cfd7ee32483ea9332b.jpg',2,'2025-11-19 06:40:24','2025-11-19 06:40:24',0),(45,'/uploads/6b35b91691d6c52543b7f8e38db62dfd.jpg',2,'2025-11-19 06:40:24','2025-11-19 06:40:24',1),(46,'/uploads/4049b852659cbcfe3cc18d8e251078c109.jpg',2,'2025-11-19 06:40:24','2025-11-19 06:40:24',2),(47,'/uploads/12708dcb7d5ef6b9814dccb8269911061.png',2,'2025-11-19 06:40:24','2025-11-19 06:40:24',3),(48,'/uploads/65b10e813b5d5a7597ac9388345c0bd103.png',2,'2025-11-19 06:40:24','2025-11-19 06:40:24',4),(49,'/uploads/471b7fe9da01f5251e3731a6e97a4a45.png',2,'2025-11-19 06:40:24','2025-11-19 06:40:24',5),(50,'/uploads/c804809819507ab6b6e11dbe7468ec11.png',3,'2025-11-19 07:12:32','2025-11-19 07:12:32',0),(51,'/uploads/8768d9d20bcf856e669573ca84f3f2ca.png',3,'2025-11-19 07:12:32','2025-11-19 07:12:32',1),(52,'/uploads/3a73f7f13184e4ea2b6537e921281855.png',3,'2025-11-19 07:12:32','2025-11-19 07:12:32',2),(53,'/uploads/95bda1cb362c54910b10aa9ec79e6e3f83.png',3,'2025-11-19 07:12:32','2025-11-19 07:12:32',3),(54,'/uploads/ab4eb461c3810297372f38bfa220bc31b.png',3,'2025-11-19 07:12:32','2025-11-19 07:12:32',4),(55,'/uploads/35da37e189e104aa2eaf663b484bf236f.png',3,'2025-11-19 07:12:32','2025-11-19 07:12:32',5),(56,'/uploads/07ae8a943104011107650ef3b3fc9589d1.png',3,'2025-11-19 07:12:32','2025-11-19 07:12:32',6),(57,'/uploads/fb32a232e7e31dcd984daeafbb381e2a.png',3,'2025-11-19 07:12:32','2025-11-19 07:12:32',7),(58,'/uploads/c6f016104dc1d868dd10a9d310fd8dcdc29.jpg',102,'2025-11-19 17:55:19','2025-11-19 17:55:19',0),(59,'/uploads/a2ab244d5a3c394b38c69424f6de7745.jpg',102,'2025-11-19 17:55:19','2025-11-19 17:55:19',1),(60,'/uploads/8f85ca191a2cc6a2eeff4eea3c36b898.jpg',102,'2025-11-19 17:55:19','2025-11-19 17:55:19',2),(61,'/uploads/987a5e37650fe61208e6ae027cc10d5710.jpg',102,'2025-11-19 17:55:19','2025-11-19 17:55:19',3),(62,'/uploads/ab2e2f99abb4a68e05b1781074baf1523.jpg',102,'2025-11-19 17:55:19','2025-11-19 17:55:19',4),(63,'/uploads/4d82359d747b10184b22ad6f2b0d2c11d.jpg',103,'2025-11-19 17:57:10','2025-11-19 17:57:10',0),(64,'/uploads/410f8fab02108ba83e5bb4e8c59debf9e7.jpg',103,'2025-11-19 17:57:10','2025-11-19 17:57:10',1),(65,'/uploads/f26bd2605b610b6cad6f710c8e858a11ca.jpg',103,'2025-11-19 17:57:10','2025-11-19 17:57:10',2),(66,'/uploads/0384bcc2d85ebe35581059a1063f517ae7.jpg',103,'2025-11-19 17:57:10','2025-11-19 17:57:10',3),(67,'/uploads/335b5237c48e8a42e5f63c9e9ad2c78d.jpg',104,'2025-11-19 17:58:52','2025-11-19 17:58:52',0),(68,'/uploads/c8110b6be7bd911087371b1372ee69bf9e.jpg',104,'2025-11-19 17:58:52','2025-11-19 17:58:52',1),(69,'/uploads/67ed35628965fee7d58860bb11310b70c.jpg',104,'2025-11-19 17:58:52','2025-11-19 17:58:52',2),(70,'/uploads/c06ae5e57a086f86d5d44510f298554e1.jpg',104,'2025-11-19 17:58:52','2025-11-19 17:58:52',3),(71,'/uploads/169d7ac7182640e1c9308dde8a962439.jpg',105,'2025-11-19 18:00:59','2025-11-19 18:00:59',0),(72,'/uploads/5676a2b63c2c10e810f565059796e61352.jpg',105,'2025-11-19 18:00:59','2025-11-19 18:00:59',1),(73,'/uploads/35c266ae7632cbf6d66d684c341ac34c.jpg',105,'2025-11-19 18:00:59','2025-11-19 18:00:59',2),(74,'/uploads/5179040749398107a8fac46f4b9791d34.jpg',105,'2025-11-19 18:00:59','2025-11-19 18:00:59',3),(75,'/uploads/01ca174ab56ca371ba325d3ac1f48dda.jpg',106,'2025-11-19 18:02:45','2025-11-19 18:02:45',0),(76,'/uploads/8706ff105818f87610610fa4ed8f78be7e7.jpg',106,'2025-11-19 18:02:45','2025-11-19 18:02:45',1),(77,'/uploads/83bf531037bdf592101ce77e8cefb261108.jpg',106,'2025-11-19 18:02:45','2025-11-19 18:02:45',2),(78,'/uploads/d464d80593effaeab2f97e4d810f310671.jpg',106,'2025-11-19 18:02:45','2025-11-19 18:02:45',3),(79,'/uploads/62c957692845946712ffc980f32d48a9.jpg',106,'2025-11-19 18:02:45','2025-11-19 18:02:45',4),(80,'/uploads/d997fffb8d330bab82c5a043646dca00.jpg',106,'2025-11-19 18:02:45','2025-11-19 18:02:45',5),(81,'/uploads/dd810ad5fbcb85e01d35109039b2108443b.jpg',107,'2025-11-19 18:05:41','2025-11-19 18:05:41',0),(82,'/uploads/7dc1eca976b5fe6813de06be7ea54376.jpg',107,'2025-11-19 18:05:41','2025-11-19 18:05:41',1),(83,'/uploads/c1366904c50b0eae27f676766ff850410.jpg',107,'2025-11-19 18:05:41','2025-11-19 18:05:41',2),(84,'/uploads/cf4567608eaa101878101271010e9c6d6d58.jpg',107,'2025-11-19 18:05:41','2025-11-19 18:05:41',3),(85,'/uploads/1060421676f8cfaa51fb33c3c986467f6.jpg',107,'2025-11-19 18:05:41','2025-11-19 18:05:41',4),(86,'/uploads/6a81daa42433e82a3e8e210e91063e1768.jpg',108,'2025-11-19 18:08:10','2025-11-19 18:08:10',0),(87,'/uploads/0eefed10efedb5bf1eb07d6c110350d5ec.jpg',108,'2025-11-19 18:08:10','2025-11-19 18:08:10',1),(88,'/uploads/10a1bf49d1469b71d87ecb09db7c5b0b7.jpg',108,'2025-11-19 18:08:10','2025-11-19 18:08:10',2),(89,'/uploads/055d184dccab2e7efd748faae12e4be2.jpg',108,'2025-11-19 18:08:10','2025-11-19 18:08:10',3),(90,'/uploads/6c2a3f932eee25b21fe52623cbcc939b.jpg',108,'2025-11-19 18:08:10','2025-11-19 18:08:10',4),(91,'/uploads/4eea3f10be3110e45db76a04e4eff108581.jpg',108,'2025-11-19 18:08:10','2025-11-19 18:08:10',5),(92,'/uploads/d108f5522fccbe45727571adcbe8810e97.jpg',108,'2025-11-19 18:08:10','2025-11-19 18:08:10',6),(93,'/uploads/e516c713bd6e6e107183384a5cb833127.jpg',108,'2025-11-19 18:08:10','2025-11-19 18:08:10',7),(94,'/uploads/2b1bebed1ff73e9bd6d9a88633566359.jpg',109,'2025-11-19 18:09:50','2025-11-19 18:09:50',0),(95,'/uploads/b520675adb961674c78c1d91d592e365.jpg',109,'2025-11-19 18:09:50','2025-11-19 18:09:50',1),(96,'/uploads/d70adaf3e4f1031ec6d256bda9eb0ee44.jpg',109,'2025-11-19 18:09:50','2025-11-19 18:09:50',2),(97,'/uploads/1188077861565910a112e7ee1006716434.jpg',109,'2025-11-19 18:09:50','2025-11-19 18:09:50',3),(98,'/uploads/e9b69d17e64155c584b9b1aaea3d7320.jpg',110,'2025-11-19 18:12:18','2025-11-19 18:12:18',0),(99,'/uploads/1d10f553494e0855f9c9e50fedf91040710.jpg',110,'2025-11-19 18:12:18','2025-11-19 18:12:18',1),(100,'/uploads/f1885b1b4236b356701981065b5ff94f.jpg',110,'2025-11-19 18:12:18','2025-11-19 18:12:18',2),(101,'/uploads/82c2cc9410a677e8adf2255ebb8887f8b.jpg',110,'2025-11-19 18:12:18','2025-11-19 18:12:18',3),(102,'/uploads/7868269ef961e8f2d14d35d34618358e.jpg',110,'2025-11-19 18:12:18','2025-11-19 18:12:18',4),(103,'/uploads/91046bbe456b4231ff58d9a6136b76167.jpg',110,'2025-11-19 18:12:18','2025-11-19 18:12:18',5),(104,'/uploads/10034d10fd1c49aee15d4509a57aef910dd.jpg',110,'2025-11-19 18:12:18','2025-11-19 18:12:18',6),(105,'/uploads/b310ecfdf68d8e9a98b4b8e253f483b75.jpg',111,'2025-11-19 18:13:43','2025-11-19 18:13:43',0),(106,'/uploads/71f6ac650d65885168ba5e82822348fe.jpg',111,'2025-11-19 18:13:43','2025-11-19 18:13:43',1),(107,'/uploads/4bc5d951a35ef8a759bb645d46db1d2a.jpg',111,'2025-11-19 18:13:43','2025-11-19 18:13:43',2),(108,'/uploads/4e2729751630210eb10999ee1ca12b3772.jpg',112,'2025-11-19 18:15:23','2025-11-19 18:15:23',0),(109,'/uploads/fa01da8a6f2229b9d1051df8b73f79b8.jpg',112,'2025-11-19 18:15:23','2025-11-19 18:15:23',1),(110,'/uploads/e21e1ebcca3eadd754ef88510be39a164.jpg',112,'2025-11-19 18:15:23','2025-11-19 18:15:23',2),(111,'/uploads/379881c822cb8f6813b6e8afac6ff1d1.jpg',112,'2025-11-19 18:15:23','2025-11-19 18:15:23',3),(112,'/uploads/a196684bb110a0b5e8f46755e7f973de9.jpg',113,'2025-11-19 18:58:30','2025-11-19 18:58:30',0),(113,'/uploads/529adcea3eae5d4c954c84c1a9ee49d9.jpg',113,'2025-11-19 18:58:30','2025-11-19 18:58:30',1),(114,'/uploads/a83bab699b9a4c838bb8e7c9baff75ac.jpg',113,'2025-11-19 18:58:30','2025-11-19 18:58:30',2),(115,'/uploads/d9a15af8d5a10b927a2de3b9e836230f.jpg',113,'2025-11-19 18:58:30','2025-11-19 18:58:30',3),(116,'/uploads/218f4fca9ce624b9f6eb6ec0fc7311021.jpg',114,'2025-11-19 18:59:28','2025-11-19 18:59:28',0),(117,'/uploads/106129108c29100c18a813bfc9075a8fcb8.jpg',114,'2025-11-19 18:59:28','2025-11-19 18:59:28',1),(118,'/uploads/31107c258a492b79f36106ac6a5a51d7ab.jpg',114,'2025-11-19 18:59:28','2025-11-19 18:59:28',2),(119,'/uploads/45e88c2646fbda4a40fb214244f4b8d10.jpg',114,'2025-11-19 18:59:28','2025-11-19 18:59:28',3),(120,'/uploads/d2087ad1a6e4fc4e11a5f1ca75361dc2.jpg',151,'2025-11-19 19:29:24','2025-11-19 19:29:24',0),(121,'/uploads/b389e33d6ce10b98aeea4f05c10100c10a10b.jpg',151,'2025-11-19 19:29:24','2025-11-19 19:29:24',1),(122,'/uploads/bce951a17b10d3d191ad5f2f89410d224f.webp',151,'2025-11-19 19:29:24','2025-11-19 19:29:24',2),(123,'/uploads/3c499105a0a9932bcb9b3e203201403e7.jpg',151,'2025-11-19 19:29:24','2025-11-19 19:29:24',3),(124,'/uploads/10a07e8397d11ee1de8e3182e2e0ecdeb.jpg',151,'2025-11-19 19:29:24','2025-11-19 19:29:24',4),(125,'/uploads/0a24ffd03a1ba1068b645de483b98f8f3.jpg',151,'2025-11-19 19:29:24','2025-11-19 19:29:24',5),(126,'/uploads/3cc1025661a3e14f20b105136275a10940e.jpg',151,'2025-11-19 19:29:24','2025-11-19 19:29:24',6),(127,'/uploads/ed85be9b7c7d4ba782a22d81f4b24614.jpg',151,'2025-11-19 19:29:24','2025-11-19 19:29:24',7),(128,'/uploads/7108de6cd72584c59fd21a451819f8ad1.jpg',151,'2025-11-19 19:29:24','2025-11-19 19:29:24',8),(129,'/uploads/1ec9f45f7ddda5910e9ac48667dc97ac6.jpg',151,'2025-11-19 19:29:24','2025-11-19 19:29:24',9),(130,'/uploads/0cff8a4e7fef57708a29bdc23b5b55bc.jpg',120,'2025-11-19 19:29:39','2025-11-19 19:29:39',0),(131,'/uploads/01e2b495049d8aebe658ccf81087a1c84.jpg',120,'2025-11-19 19:29:39','2025-11-19 19:29:39',1),(132,'/uploads/5504db2c71ccca5bcf3dc5f96b855d13.jpg',120,'2025-11-19 19:29:39','2025-11-19 19:29:39',2),(133,'/uploads/c24840424a1c35989994ac0d4cf466eb.jpg',155,'2025-11-19 19:32:23','2025-11-19 19:32:23',0),(134,'/uploads/48852b1bbe10a10bf3d14b3ad3605ad4f6.jpg',155,'2025-11-19 19:32:23','2025-11-19 19:32:23',1),(135,'/uploads/aa6489b52269dc07a58fc7453a7e6a2d.jpg',155,'2025-11-19 19:32:23','2025-11-19 19:32:23',2),(136,'/uploads/e226e5ea51ac3b43310f7b51cd71bc37c.jpg',155,'2025-11-19 19:32:23','2025-11-19 19:32:23',3),(137,'/uploads/79f982940ef2084fad821346aafdc6f2.jpg',155,'2025-11-19 19:32:23','2025-11-19 19:32:23',4),(138,'/uploads/f88bdcbf512351fbef46eae89da39cd1.jpg',155,'2025-11-19 19:32:23','2025-11-19 19:32:23',5);
/*!40000 ALTER TABLE `product_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_reviews`
--

DROP TABLE IF EXISTS `product_reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_reviews` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `user_id` int NOT NULL,
  `order_id` int DEFAULT NULL COMMENT 'Chỉ cho phép đánh giá sau khi mua',
  `rating` tinyint NOT NULL,
  `title` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `comment` text COLLATE utf8mb4_unicode_ci,
  `images` json DEFAULT NULL COMMENT 'Array các URL hình ảnh review',
  `is_verified_purchase` tinyint(1) DEFAULT '0',
  `helpful_count` int DEFAULT '0',
  `not_helpful_count` int DEFAULT '0',
  `status` enum('pending','approved','rejected') COLLATE utf8mb4_unicode_ci DEFAULT 'pending',
  `admin_reply` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_user_product_order` (`user_id`,`product_id`,`order_id`),
  KEY `order_id` (`order_id`),
  KEY `idx_product` (`product_id`),
  KEY `idx_rating` (`rating`),
  KEY `idx_status` (`status`),
  KEY `idx_reviews_product_status` (`product_id`,`status`,`rating`),
  CONSTRAINT `product_reviews_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  CONSTRAINT `product_reviews_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `product_reviews_ibfk_3` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE SET NULL,
  CONSTRAINT `product_reviews_chk_1` CHECK (((`rating` >= 1) and (`rating` <= 5)))
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_reviews`
--

LOCK TABLES `product_reviews` WRITE;
/*!40000 ALTER TABLE `product_reviews` DISABLE KEYS */;
INSERT INTO `product_reviews` VALUES (3,2,3,2,5,'Siêu phẩm','Whey chất lượng',NULL,1,2,0,'approved','Rất vui khi bạn thích!','2025-10-06 05:00:00','2025-10-11 03:28:23'),(4,3,4,3,3,'Bình thường','Tăng cân chậm',NULL,1,0,1,'approved',NULL,'2025-10-07 06:00:00','2025-10-11 03:28:23'),(5,4,5,4,5,'Năng lượng dồi dào','Pre-workout mạnh','[\"/images/review2.jpg\"]',1,4,0,'pending',NULL,'2025-10-08 07:00:00','2025-10-11 03:28:23'),(7,6,7,NULL,5,'Vitamin chất lượng','Cải thiện sức khỏe',NULL,0,2,0,'approved',NULL,'2025-10-10 09:00:00','2025-10-11 03:28:23'),(8,7,8,6,5,'Creatine hiệu quả','Tăng sức mạnh rõ rệt',NULL,1,3,0,'approved','Tuyệt vời!','2025-10-11 10:00:00','2025-10-11 03:28:23'),(9,8,9,7,2,'Không hiệu quả','Fat burner yếu',NULL,1,0,2,'rejected','Đã kiểm tra, có thể do chế độ ăn','2025-10-12 11:00:00','2025-10-11 03:28:23'),(10,9,10,8,4,'Omega tốt','Giúp tim mạch',NULL,1,1,0,'approved',NULL,'2025-10-13 12:00:00','2025-10-11 03:28:23');
/*!40000 ALTER TABLE `product_reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_variants`
--

DROP TABLE IF EXISTS `product_variants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_variants` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `sku` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `variant_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Ví dụ: 2.2kg Chocolate, 5lb Vanilla',
  `size` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '2.2kg, 5lb, 30 viên',
  `flavor` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Chocolate, Vanilla, Strawberry',
  `color` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `compare_price` decimal(10,2) DEFAULT NULL,
  `inventory_quantity` int DEFAULT '0',
  `weight` decimal(8,2) DEFAULT NULL COMMENT 'Trọng lượng',
  `weight_unit` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT 'kg' COMMENT 'kg, lb, g',
  `image_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `barcode` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_default` tinyint(1) DEFAULT '0' COMMENT 'Biến thể mặc định',
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `sku` (`sku`),
  KEY `idx_product` (`product_id`),
  KEY `idx_sku` (`sku`),
  KEY `idx_default` (`is_default`),
  CONSTRAINT `product_variants_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_variants`
--

LOCK TABLES `product_variants` WRITE;
/*!40000 ALTER TABLE `product_variants` DISABLE KEYS */;
INSERT INTO `product_variants` VALUES (3,2,'HW-ISOL-1KG','1kg Isolate','1kg','Unflavored',NULL,1400000.00,1500000.00,25,1.00,'kg','/images/hw-isol.jpg','2345678901',1,1,'2025-10-11 03:28:23','2025-11-17 04:10:37'),(4,3,'MGE-CHOC-6LB','6lb Chocolate','6lb','Chocolate',NULL,900000.00,1100000.00,40,2.72,'kg','/images/mge-choc.jpg','3456789012',1,1,'2025-10-11 03:28:23','2025-10-11 03:28:23'),(5,4,'PWC-ORIGINAL','Original 30 servings','30 servings',NULL,'Blue',800000.00,1500000.00,60,0.30,'kg','/images/pwc-orig.jpg','4567890123',1,1,'2025-10-11 03:28:23','2025-11-17 04:55:37'),(6,5,'BCA-FRUIT-300G','300g Fruit Punch','300g','Fruit Punch',NULL,500000.00,600000.00,100,0.30,'g','/images/bca-fruit.jpg','5678901234',1,1,'2025-10-11 03:28:23','2025-10-11 03:28:23'),(7,6,'MVD-60TAB','60 tablets','60 tablets','Chocolate',NULL,300000.00,1500000.00,75,0.10,'kg','/images/mvd-60.jpg','6789012345',1,1,'2025-10-11 03:28:23','2025-11-17 05:28:00'),(8,7,'CM-300G','300g Powder','300g',NULL,NULL,400000.00,1500000.00,45,0.30,'g','/images/cm-300.jpg','7890123456',1,1,'2025-10-11 03:28:23','2025-11-17 05:29:51'),(9,8,'FBS-90CAP','90 capsules','90 capsules',NULL,NULL,700000.00,1500000.00,30,0.15,'kg','/images/fbs-90.jpg','8901234567',1,1,'2025-10-11 03:28:23','2025-11-17 05:28:00'),(10,9,'O3FO-1000MG','1000mg 60 softgels','60 softgels',NULL,NULL,350000.00,1500000.00,55,0.20,'kg','/images/o3fo-1000.jpg','9012345678',1,1,'2025-10-11 03:28:23','2025-11-17 05:31:01'),(23,2,'DY-ISO-5LBS-CHOC','5lbs - Gourmet Chocolate','5lbs','Gourmet Chocolate',NULL,2450000.00,2590000.00,18,2.27,'kg','https://example.com/images/dy-iso-5lbs-choc.jpg','223456789001',1,1,'2025-10-19 06:01:33','2025-10-19 06:01:33'),(24,2,'DY-ISO-5LBS-VANI','5lbs - Vanilla','5lbs','Vanilla',NULL,2450000.00,2590000.00,12,2.27,'kg','https://example.com/images/dy-iso-5lbs-vanilla.jpg','223456789002',0,1,'2025-10-19 06:01:33','2025-10-19 06:01:33'),(25,3,'R1-5LBS-CHOC','5lbs - Chocolate Fudge','5lbs','Chocolate Fudge',NULL,1950000.00,2100000.00,22,2.27,'kg','https://example.com/images/r1-5lbs-choc.jpg','323456789001',1,1,'2025-10-19 06:01:33','2025-10-19 06:01:33'),(26,3,'R1-5LBS-VANI','5lbs - Vanilla Creme','5lbs','Vanilla Creme',NULL,1950000.00,2100000.00,16,2.27,'kg','https://example.com/images/r1-5lbs-vanilla.jpg','323456789002',0,1,'2025-10-19 06:01:33','2025-10-19 06:01:33'),(27,4,'MP-5LBS-CHOC','5lbs - Chocolate Smooth','5lbs','Chocolate Smooth',NULL,1850000.00,1990000.00,30,2.27,'kg','https://example.com/images/mp-5lbs-choc.jpg','423456789001',1,1,'2025-10-19 06:01:33','2025-10-19 06:01:33'),(28,4,'MP-5LBS-VANI','5lbs - Vanilla','5lbs','Vanilla',NULL,1850000.00,1990000.00,25,2.27,'kg','https://example.com/images/mp-5lbs-vanilla.jpg','423456789002',0,1,'2025-10-19 06:01:33','2025-10-19 06:01:33'),(29,4,'MP-5LBS-STRAW','5lbs - Strawberry Cream','5lbs','Strawberry Cream',NULL,1850000.00,1990000.00,18,2.27,'kg','https://example.com/images/mp-5lbs-straw.jpg','423456789003',0,1,'2025-10-19 06:01:33','2025-10-19 06:01:33'),(30,10,'Gym Belt','5lbs - Vanilla','5lbs','Vanilla',NULL,1850000.00,1990000.00,50,2.27,'kg',NULL,NULL,0,1,'2025-11-17 04:50:42','2025-11-17 04:50:42'),(31,2,'HW001-V1763479189949','vaini 10 cân ',NULL,NULL,NULL,5000000.00,60000000.00,9,NULL,'kg','',NULL,0,1,'2025-11-18 15:19:49','2025-11-18 15:19:49'),(32,101,'sku-161-V1763537422402','1kg Isolate','1kg','Unflavored','xanh',1400000.00,1500000.00,25,1.00,'g','/uploads/7db43bd5186945386826e81d6d26a6ed.png',NULL,0,1,'2025-11-19 07:30:22','2025-11-19 07:30:22');
/*!40000 ALTER TABLE `product_variants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_views`
--

DROP TABLE IF EXISTS `product_views`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_views` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `product_id` int NOT NULL,
  `viewed_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `ip_address` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `product_views_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `product_views_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_views`
--

LOCK TABLES `product_views` WRITE;
/*!40000 ALTER TABLE `product_views` DISABLE KEYS */;
INSERT INTO `product_views` VALUES (1,NULL,7,'2025-11-20 16:52:42','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36 Edg/142.0.0.0'),(2,NULL,9,'2025-11-24 10:07:16','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36 Edg/142.0.0.0'),(3,NULL,86,'2025-11-13 13:08:29','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36 Edg/142.0.0.0'),(4,NULL,51,'2025-11-13 13:01:01','127.0.0.1','Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Mobile Safari/537.36 Edg/142.0.0.0'),(5,NULL,96,'2025-11-13 13:02:53','127.0.0.1','Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Mobile Safari/537.36 Edg/142.0.0.0'),(7,NULL,31,'2025-11-13 13:18:46','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36 Edg/142.0.0.0'),(15,NULL,8,'2025-11-24 10:07:31','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36 Edg/142.0.0.0'),(16,NULL,3,'2025-11-24 10:09:03','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36 Edg/142.0.0.0'),(17,NULL,10,'2025-11-24 10:09:29','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36 Edg/142.0.0.0'),(18,NULL,2,'2025-11-24 10:09:12','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36 Edg/142.0.0.0'),(19,NULL,92,'2025-11-20 12:45:41','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36 Edg/142.0.0.0'),(20,NULL,104,'2025-11-20 12:46:13','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36 Edg/142.0.0.0'),(21,NULL,6,'2025-11-24 10:07:02','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36 Edg/142.0.0.0'),(22,NULL,77,'2025-11-24 09:47:11','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36 Edg/142.0.0.0'),(23,NULL,4,'2025-11-24 09:46:43','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36 Edg/142.0.0.0'),(24,NULL,120,'2025-11-24 10:09:27','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36 Edg/142.0.0.0'),(25,NULL,34,'2025-11-24 10:07:34','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36 Edg/142.0.0.0'),(26,NULL,5,'2025-11-24 10:09:05','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36 Edg/142.0.0.0'),(27,NULL,151,'2025-11-24 10:09:31','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36 Edg/142.0.0.0');
/*!40000 ALTER TABLE `product_views` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(220) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sku` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Mã sản phẩm',
  `brand_id` int DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  `short_description` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `ingredients` text COLLATE utf8mb4_unicode_ci COMMENT 'Thành phần',
  `usage_instructions` text COLLATE utf8mb4_unicode_ci COMMENT 'Hướng dẫn sử dụng',
  `warnings` text COLLATE utf8mb4_unicode_ci COMMENT 'Cảnh báo, lưu ý',
  `price` decimal(10,2) NOT NULL,
  `compare_price` decimal(10,2) DEFAULT NULL COMMENT 'Giá gốc để tính % giảm',
  `cost_price` decimal(10,2) DEFAULT NULL COMMENT 'Giá vốn',
  `track_inventory` tinyint(1) DEFAULT '1',
  `inventory_quantity` int DEFAULT '0',
  `low_stock_threshold` int DEFAULT '10',
  `expiry_date` date DEFAULT NULL,
  `batch_number` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `origin_country` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `manufacturer` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `featured_image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image_gallery` json DEFAULT NULL COMMENT 'Array các URL hình ảnh',
  `meta_title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meta_description` text COLLATE utf8mb4_unicode_ci,
  `is_featured` tinyint(1) DEFAULT '0',
  `is_new_arrival` tinyint(1) DEFAULT '0',
  `is_bestseller` tinyint(1) DEFAULT '0',
  `is_on_sale` tinyint(1) DEFAULT '0',
  `status` enum('draft','active','inactive','out_of_stock') COLLATE utf8mb4_unicode_ci DEFAULT 'draft',
  `published_at` timestamp NULL DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  UNIQUE KEY `sku` (`sku`),
  KEY `created_by` (`created_by`),
  KEY `idx_slug` (`slug`),
  KEY `idx_brand` (`brand_id`),
  KEY `idx_category` (`category_id`),
  KEY `idx_status` (`status`),
  KEY `idx_featured` (`is_featured`,`status`),
  KEY `idx_price` (`price`),
  KEY `idx_products_search` (`status`,`is_featured`,`category_id`,`brand_id`),
  KEY `idx_products_price_range` (`status`,`price`),
  FULLTEXT KEY `idx_search` (`name`,`short_description`,`description`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`) ON DELETE SET NULL,
  CONSTRAINT `products_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL,
  CONSTRAINT `products_ibfk_3` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=156 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (2,'Hydrolyzed Whey','hydrolyzed-whey','HW001',2,1,'Whey thủy phân','Mô tả...','Hydrolyzed whey','Sau tập','Tham khảo bác sĩ',1400000.00,1500000.00,900000.00,1,50,5,'2026-11-30','BATCH002','USA','Dymatize','/uploads/e4daca5df18310e731d37f4666bf5e1034.png','[\"/images/hw1.jpg\"]','Hydrolyzed Whey','Hấp thụ nhanh',0,0,0,0,'active','2025-01-01 17:00:00',NULL,'2025-10-11 03:09:33','2025-11-19 06:40:24'),(3,'Mass Gainer Extreme','mass-gainer-extreme','MGE001',3,2,'Tăng cân nhanh','Mô tả...','Maltodextrin, whey','2 scoops/ngày','Không cho trẻ em',900000.00,1100000.00,500000.00,1,80,10,'2026-10-31','BATCH003','USA','MuscleTech','/uploads/a6f3ebc87aaa93ffc11310d18950c010cf.png','[\"/images/mge1.jpg\"]','Mass Gainer','Tăng khối lượng',1,1,0,1,'active','2025-01-02 17:00:00',NULL,'2025-10-11 03:09:33','2025-11-19 07:12:32'),(4,'Pre-Workout C4','pre-workout-c4','PWC001',5,3,'Tăng năng lượng','Mô tả...','Caffeine, beta-alanine','1 scoop trước tập','Không dùng buổi tối',800000.00,1500000.00,400000.00,1,120,15,NULL,'BATCH004','USA','Cellucor','/uploads/34cb3e2e6b5fc5e2f427db4a94b6b25f.png','[\"/images/pwc1.jpg\"]','C4 Pre-Workout','Năng lượng mạnh',0,0,1,0,'active','2025-01-03 17:00:00',NULL,'2025-10-11 03:09:33','2025-11-17 04:58:12'),(5,'BCAA 2:1:1','bcaa-211','BCA001',4,4,'Axit amin thiết yếu','Mô tả...','Leucine, isoleucine, valine','Trong tập','Uống đủ nước',500000.00,600000.00,250000.00,1,200,20,'2026-09-30','BATCH005','USA','BSN','/uploads/e562b09cb8babfefd104bcec64ace562a.png','[\"/images/bcaa1.jpg\"]','BCAA','Phục hồi cơ',1,0,0,0,'active','2025-01-04 17:00:00',NULL,'2025-10-11 03:09:33','2025-10-17 03:52:22'),(6,'Multivitamin Daily','multivitamin-daily','MVD001',9,5,'Vitamin tổng hợp','Mô tả...','Vitamin A,B,C,D,E','1 viên/ngày','Không vượt liều',700000.00,1500000.00,150000.00,1,150,10,'2026-08-31','BATCH006','USA','Now Foods','/uploads/fb11028523c781c3f8124418f78dc910bf.png','[\"/images/mvd1.jpg\"]','Multivitamin','Sức khỏe hàng ngày',0,1,0,1,'active','2025-01-05 17:00:00',NULL,'2025-10-11 03:09:33','2025-11-18 16:28:28'),(7,'Creatine Monohydrate','creatine-monohydrate','CM001',1,4,'Tăng sức mạnh','Mô tả...','Creatine monohydrate','5g/ngày','Uống nhiều nước',1000.00,1010.00,900.00,1,90,5,NULL,'BATCH007','USA','Optimum Nutrition','/uploads/7c7874e72fb198985455b971f11036a87.png','[\"/images/cm1.jpg\"]','Creatine','Xây dựng cơ',1,0,1,0,'active','2025-01-06 17:00:00',NULL,'2025-10-11 03:09:33','2025-11-11 03:36:44'),(8,'Fat Burner Shred','fat-burner-shred','FBS001',2,3,'Đốt mỡ','Mô tả...','Green tea extract, caffeine','2 viên trước bữa','Không cho tim mạch',700000.00,1500000.00,350000.00,1,60,10,'2026-07-31','BATCH008','USA','Dymatize','/uploads/7e8386a7a8be66348143f72810ce67497.png','[\"/images/fbs1.jpg\"]','Shred Fat Burner','Giảm cân',0,1,0,1,'active','2025-01-07 17:00:00',NULL,'2025-10-11 03:09:33','2025-11-17 04:58:12'),(9,'Omega 3 Fish Oil','omega-3-fish-oil','O3FO001',10,5,'Dầu cá omega 3','Mô tả...','EPA, DHA','1-2 viên/ngày','Kiểm tra dị ứng cá',350000.00,400000.00,180000.00,1,110,15,'2026-06-30','BATCH009','USA','Jarrow Formulas','/uploads/beff07a4ca91afcae27dd3efc3d23696.png','[\"/images/o3fo1.jpg\"]','Omega 3','Sức khỏe tim mạch',1,0,0,0,'active','2025-01-08 17:00:00',NULL,'2025-10-11 03:09:33','2025-10-17 03:53:07'),(10,'Gym Belt','gym-belt','GB001',1,6,'Đai lưng tập gym','Mô tả...','Da tổng hợp','Đeo khi squat','Chọn size đúng',250000.00,1500000.00,100000.00,1,30,5,NULL,'BATCH010','Vietnam','Local Brand','/uploads/aa6da57ebc3274231aff81e9fe2e1b6d.png','[\"/images/gb1.jpg\"]','Gym Belt','Hỗ trợ lưng',0,1,0,1,'active','2025-01-09 17:00:00',NULL,'2025-10-11 03:09:33','2025-11-17 04:58:12'),(31,'ISO100 Hydrolyzed Protein','iso100-hydrolyzed-protein-v2','DYMA-ISO100-2KG-V2',2,1,'Protein thủy phân hấp thụ siêu nhanh','ISO100 là sản phẩm protein whey hydrolyzed cao cấp, được thủy phân để hấp thụ nhanh chóng. Lý tưởng sau tập luyện.',NULL,NULL,NULL,1250000.00,1450000.00,NULL,1,150,10,NULL,NULL,NULL,NULL,'/uploads/55d15369ed8c2910fb10211a9b25949e4d.png',NULL,NULL,NULL,1,1,1,1,'active','2025-10-17 09:15:25',NULL,'2025-10-17 09:15:25','2025-10-17 09:27:52'),(32,'Nitro-Tech Whey Gold','nitro-tech-whey-gold-v2','MUSC-NT-2.5KG-V2',1,1,'Protein cao cấp với BCAA & Creatine','Nitro-Tech kết hợp whey protein isolate với peptides, BCAA và creatine monohydrate.',NULL,NULL,NULL,1180000.00,1380000.00,NULL,1,200,10,NULL,NULL,NULL,NULL,'/uploads/c4e8c9ffcd751b55ffafa8685ae62fc6.png',NULL,NULL,NULL,1,0,1,1,'active','2025-10-17 09:15:25',NULL,'2025-10-17 09:15:25','2025-10-17 09:28:00'),(33,'Syntha-6 Protein','syntha-6-protein-v2','BSN-SYN6-2KG-V2',3,1,'Protein đa thành phần giải phóng chậm','Syntha-6 là blend protein cao cấp với 6 loại protein khác nhau, cung cấp dinh dưỡng lâu dài.',NULL,NULL,NULL,950000.00,1150000.00,NULL,1,180,10,NULL,NULL,NULL,NULL,'/uploads/2f528314ea61dc10cd94d7ab2814438a4.png',NULL,NULL,NULL,0,1,0,1,'active','2025-10-17 09:15:25',NULL,'2025-10-17 09:15:25','2025-10-17 09:28:24'),(34,'Platinum 100% Casein','platinum-casein-v2','MUSC-CAS-1.8KG-V2',1,1,'Casein protein hấp thụ chậm','Casein tinh khiết 100%, lý tưởng uống trước khi ngủ để phục hồi cơ bắp suốt đêm.',NULL,NULL,NULL,1050000.00,1250000.00,NULL,1,120,10,NULL,NULL,NULL,NULL,'/uploads/1cc6a39fd10a62b9cdf6fda5b99b4e637.png',NULL,NULL,NULL,0,0,0,1,'active','2025-10-17 09:15:25',NULL,'2025-10-17 09:15:25','2025-10-17 09:28:29'),(35,'Plant Protein Vegan','plant-protein-vegan-v2','VEG-PLANT-1KG-V2',2,1,'Protein thực vật organic','Protein từ đậu Hà Lan, gạo lứt và quinoa. Hoàn toàn từ thực vật, không lactose.',NULL,NULL,NULL,850000.00,950000.00,NULL,1,100,10,NULL,NULL,NULL,NULL,'/uploads/10c55976ad4af74df63fddd4f252f5e9c.png',NULL,NULL,NULL,0,1,0,1,'active','2025-10-17 09:15:25',NULL,'2025-10-17 09:15:25','2025-10-17 09:29:54'),(36,'Beef Protein Isolate','beef-protein-isolate-v2','MUSC-BEEF-2KG-V2',1,1,'Protein từ thịt bò tinh khiết','Beef Protein Isolate từ thịt bò thật, không chứa sữa, phù hợp người непереносимость lactose.',NULL,NULL,NULL,1350000.00,1550000.00,NULL,1,90,10,NULL,NULL,NULL,NULL,'/uploads/4bc215cb277a57146710b010213ddc3a3b.png',NULL,NULL,NULL,1,0,0,1,'active','2025-10-17 09:15:25',NULL,'2025-10-17 09:15:25','2025-10-17 09:29:58'),(37,'Whey Protein Concentrate','whey-concentrate-v2','ON-WPC-2KG-V2',1,1,'Whey protein giá tốt cho người mới','Whey Protein Concentrate cơ bản, giá cả phải chăng, chất lượng cao từ Optimum Nutrition.',NULL,NULL,NULL,780000.00,880000.00,NULL,1,250,10,NULL,NULL,NULL,NULL,'/uploads/1639ecf4fa69257fc6daa55aea652544.png',NULL,NULL,NULL,0,1,1,1,'active','2025-10-17 09:15:25',NULL,'2025-10-17 09:15:25','2025-10-17 09:30:23'),(38,'Elite Whey Protein','elite-whey-protein-v2','DYMA-ELITE-2KG-V2',2,1,'Whey protein cao cấp dễ hòa tan','Elite Whey từ Dymatize với công nghệ hòa tan tuyệt vời, hương vị thơm ngon.',NULL,NULL,NULL,980000.00,1180000.00,NULL,1,160,10,NULL,NULL,NULL,NULL,'/uploads/813bddde0035d1d0fdfc05dadf2a9853.png',NULL,NULL,NULL,0,0,1,1,'active','2025-10-17 09:15:25',NULL,'2025-10-17 09:15:25','2025-10-17 09:30:36'),(39,'Mass Gainer Extreme','mass-gainer-extreme-v2','MUSC-MASS-5KG-V2',1,1,'Mass gainer tăng cân nhanh','Mass Gainer với 1250 calories mỗi serving, giúp tăng cơ và cân nặng hiệu quả.',NULL,NULL,NULL,1450000.00,1650000.00,NULL,1,80,10,NULL,NULL,NULL,NULL,'/uploads/d9191102d1961014a5581013cdb7395fbce.png',NULL,NULL,NULL,1,1,0,1,'active','2025-10-17 09:15:25',NULL,'2025-10-17 09:15:25','2025-10-17 09:31:17'),(40,'Performance Whey','performance-whey-v2','ON-PERF-2KG-V2',1,1,'Whey protein tốc độ hấp thụ cao','Performance Whey được thiết kế cho vận động viên, hỗ trợ phục hồi cơ nhanh.',NULL,NULL,NULL,1050000.00,1250000.00,NULL,1,140,10,NULL,NULL,NULL,NULL,'/uploads/fec877e5ea1969b33588bf5d3c1153c3.png',NULL,NULL,NULL,0,0,0,1,'active','2025-10-17 09:15:25',NULL,'2025-10-17 09:15:25','2025-10-17 09:32:02'),(41,'Multivitamin Daily','multivitamin-daily-v2','VIT-MULTI-100-V2',4,2,'Vitamin tổng hợp hàng ngày','Multivitamin với 25+ vitamin và khoáng chất thiết yếu cho sức khỏe tổng thể.',NULL,NULL,NULL,350000.00,450000.00,NULL,1,300,10,NULL,NULL,NULL,NULL,'/uploads/28ef2de915f847e7b86cd106adcf5183e.png',NULL,NULL,NULL,1,0,1,1,'active','2025-10-17 09:15:25',NULL,'2025-10-17 09:15:25','2025-10-17 09:33:16'),(42,'Omega-3 Fish Oil','omega-3-fish-oil-v2','OMEG-1000-90-V2',4,2,'Dầu cá Omega-3 tinh khiết','Omega-3 từ cá biển sâu, hỗ trợ tim mạch, não bộ và giảm viêm.',NULL,NULL,NULL,450000.00,550000.00,NULL,1,250,10,NULL,NULL,NULL,NULL,'/uploads/f803575d10279c6f94106978776a2d4736.png',NULL,NULL,NULL,1,1,1,1,'active','2025-10-17 09:15:25',NULL,'2025-10-17 09:15:25','2025-10-17 09:33:21'),(43,'Vitamin D3 5000 IU','vitamin-d3-5000-v2','VIT-D3-120-V2',4,2,'Vitamin D3 liều cao hỗ trợ xương','Vitamin D3 5000 IU giúp hấp thụ canxi, tăng cường hệ miễn dịch.',NULL,NULL,NULL,280000.00,350000.00,NULL,1,200,10,NULL,NULL,NULL,NULL,'/uploads/ee7ad8944b97ed1ff2b2cc8498c6ad2d.png',NULL,NULL,NULL,0,1,0,1,'active','2025-10-17 09:15:25',NULL,'2025-10-17 09:15:25','2025-10-17 09:33:25'),(44,'Vitamin C 1000mg','vitamin-c-1000-v2','VIT-C-100-V2',4,2,'Vitamin C tăng cường miễn dịch','Vitamin C liều cao với bioflavonoids, hỗ trợ hệ miễn dịch và làm đẹp da.',NULL,NULL,NULL,220000.00,280000.00,NULL,1,350,10,NULL,NULL,NULL,NULL,'/uploads/6bdf91b9610cdd441b19fc5834dae94bd.png',NULL,NULL,NULL,0,0,1,1,'active','2025-10-17 09:15:25',NULL,'2025-10-17 09:15:25','2025-10-17 09:33:35'),(45,'Zinc Magnesium ZMA','zinc-magnesium-zma-v2','ZMA-90-V2',4,2,'ZMA hỗ trợ giấc ngủ và phục hồi','ZMA kết hợp Zinc, Magnesium và Vitamin B6, cải thiện chất lượng giấc ngủ.',NULL,NULL,NULL,320000.00,400000.00,NULL,1,180,10,NULL,NULL,NULL,NULL,'/uploads/b3538df01151eb60caa9610cbf89aae15.png',NULL,NULL,NULL,0,1,0,1,'active','2025-10-17 09:15:25',NULL,'2025-10-17 09:15:25','2025-10-17 09:33:38'),(46,'Calcium + Vitamin D','calcium-vitamin-d-v2','CAL-D-120-V2',4,2,'Canxi kết hợp Vitamin D','Canxi citrate dễ hấp thụ với Vitamin D3, tốt cho xương khớp.',NULL,NULL,NULL,280000.00,350000.00,NULL,1,220,10,NULL,NULL,NULL,NULL,'/uploads/c3faefe4829f2e348e798a3cd636a270.png',NULL,NULL,NULL,0,0,0,1,'active','2025-10-17 09:15:25',NULL,'2025-10-17 09:15:25','2025-10-17 09:33:43'),(47,'B-Complex Vitamin','b-complex-v2','VIT-B-100-V2',4,2,'Vitamin B tổng hợp năng lượng','B-Complex với đầy đủ 8 loại vitamin B, hỗ trợ chuyển hóa năng lượng.',NULL,NULL,NULL,250000.00,320000.00,NULL,1,280,10,NULL,NULL,NULL,NULL,'/uploads/eb0e594475498c179a2e58aff69d10d00.png',NULL,NULL,NULL,0,0,1,1,'active','2025-10-17 09:15:25',NULL,'2025-10-17 09:15:25','2025-10-17 09:33:46'),(48,'Iron + Vitamin C','iron-vitamin-c-v2','IRON-60-V2',4,2,'Sắt kết hợp Vitamin C','Iron chelate dễ hấp thụ với Vitamin C, ngăn ngừa thiếu máu.',NULL,NULL,NULL,180000.00,240000.00,NULL,1,200,10,NULL,NULL,NULL,NULL,'/uploads/24ce462cc383a71052a1428061d18dc23.png',NULL,NULL,NULL,0,1,0,0,'active','2025-10-17 09:15:25',NULL,'2025-10-17 09:15:25','2025-10-17 09:33:49'),(49,'Collagen Peptides','collagen-peptides-v2','COLL-300G-V2',4,2,'Collagen thủy phân làm đẹp da','Collagen peptides từ cá, hỗ trợ da, tóc, móng và xương khớp.',NULL,NULL,NULL,580000.00,680000.00,NULL,1,150,10,NULL,NULL,NULL,NULL,'/uploads/08e3634387c4d1a51b329d10059086c7b.png',NULL,NULL,NULL,1,1,0,1,'active','2025-10-17 09:15:25',NULL,'2025-10-17 09:15:25','2025-10-17 09:33:52'),(50,'Glucosamine + Chondroitin','glucosamine-chondroitin-v2','GLUC-120-V2',4,2,'Hỗ trợ xương khớp toàn diện','Glucosamine sulfate và Chondroitin cho người tập gym bảo vệ khớp.',NULL,NULL,NULL,450000.00,550000.00,NULL,1,160,10,NULL,NULL,NULL,NULL,'/uploads/36d536f01025328047dd1038d63ed0bcc9.png',NULL,NULL,NULL,0,0,0,1,'active','2025-10-17 09:15:25',NULL,'2025-10-17 09:15:25','2025-10-17 09:34:50'),(51,'Premium Lifting Straps','premium-lifting-straps','ACC-STRAP-01',1,3,'Dây kéo tập lưng chuyên nghiệp','Lifting Straps cao cấp giúp tăng độ bám khi tập lưng, deadlift và shrugs. Chất liệu bền bỉ, đệm tay êm ái.',NULL,NULL,NULL,180000.00,250000.00,NULL,1,300,10,NULL,NULL,NULL,NULL,'/uploads/3e06b2b256aeb34b488f97f1ccae8e3e.png',NULL,NULL,NULL,1,1,0,1,'active','2025-10-17 09:21:40',NULL,'2025-10-17 09:21:40','2025-10-17 09:34:23'),(52,'Weightlifting Belt Leather','weightlifting-belt-leather','ACC-BELT-LEATHER',1,3,'Đai tập gym da thật cao cấp','Đai lưng da bò thật 100%, độ dày 10mm, hỗ trợ cột sống khi tập squat, deadlift. Size M, L, XL.',NULL,NULL,NULL,850000.00,1050000.00,NULL,1,150,10,NULL,NULL,NULL,NULL,'/uploads/fdb3a3c10eee37dfdffa4352735331992.png',NULL,NULL,NULL,1,0,1,1,'active','2025-10-17 09:21:40',NULL,'2025-10-17 09:21:40','2025-10-17 09:34:27'),(53,'Gym Gloves Pro','gym-gloves-pro','ACC-GLOVES-PRO',2,3,'Găng tay tập gym chống trơn','Găng tay tập gym với lớp đệm dày, thoáng khí, bảo vệ bàn tay và tăng độ bám. Có dây quấn cổ tay.',NULL,NULL,NULL,220000.00,280000.00,NULL,1,250,10,NULL,NULL,NULL,NULL,'/uploads/89a1c2d37c26d45914cad236a56c8f71.png',NULL,NULL,NULL,0,1,1,1,'active','2025-10-17 09:21:40',NULL,'2025-10-17 09:21:40','2025-10-17 09:34:31'),(54,'Resistance Bands Set','resistance-bands-set','ACC-BANDS-SET',3,3,'Bộ dây kháng lực tập gym','Set 5 dây kháng lực với độ căng khác nhau (X-Light đến X-Heavy). Kèm túi đựng và hướng dẫn tập.',NULL,NULL,NULL,380000.00,480000.00,NULL,1,200,10,NULL,NULL,NULL,NULL,'/uploads/10da10bc2f5ea42391dfa58b10712b9aecd.png',NULL,NULL,NULL,1,1,0,1,'active','2025-10-17 09:21:40',NULL,'2025-10-17 09:21:40','2025-10-17 09:34:34'),(55,'Shaker Bottle 700ml','shaker-bottle-700ml','ACC-SHAKER-700',1,3,'Bình lắc protein 700ml','Bình shaker cao cấp với lưới lọc inox, nắp kín chống rò rỉ. Dung tích 700ml, BPA-free.',NULL,NULL,NULL,120000.00,150000.00,NULL,1,500,10,NULL,NULL,NULL,NULL,'/uploads/3422a03a2eaa710ffcfe1b1b2c6877fda.png',NULL,NULL,NULL,0,0,1,1,'active','2025-10-17 09:21:40',NULL,'2025-10-17 09:21:40','2025-10-17 09:34:38'),(56,'C4 Original Pre-Workout','c4-original-pre-workout','PRE-C4-ORIG-30',4,4,'Pre-workout bán chạy nhất thế giới','C4 Original với caffeine, beta-alanine, creatine nitrate. Tăng năng lượng, tập trung và sức bền.',NULL,NULL,NULL,750000.00,880000.00,NULL,1,180,10,NULL,NULL,NULL,NULL,'/uploads/75b59fa3ab0db273762432dec410244d5.png',NULL,NULL,NULL,1,0,1,1,'active','2025-10-17 09:21:40',NULL,'2025-10-17 09:21:40','2025-10-17 09:34:41'),(57,'Pre-JYM Pre-Workout','pre-jym-pre-workout','PRE-JYM-20',1,4,'Pre-workout khoa học từ Jim Stoppani','Pre-JYM công thức đầy đủ với BCAA, creatine HCl, beta-alanine, caffeine. Không chất độn.',NULL,NULL,NULL,980000.00,1180000.00,NULL,1,120,10,NULL,NULL,NULL,NULL,'/uploads/550ae5bd4acf997815e10fbcc612dd12a.png',NULL,NULL,NULL,1,1,1,1,'active','2025-10-17 09:21:40',NULL,'2025-10-17 09:21:40','2025-10-17 09:34:44'),(58,'NO-Xplode Pre-Workout','no-xplode-pre-workout','PRE-NOX-30',3,4,'Pre-workout tăng bơm cơ','NO-Xplode với công nghệ NO Blend, tăng lưu lượng máu đến cơ, bơm cơ mạnh mẽ.',NULL,NULL,NULL,680000.00,800000.00,NULL,1,150,10,NULL,NULL,NULL,NULL,'/uploads/f102d33932569914f5e10ecd6cc97a75e7.png',NULL,NULL,NULL,0,1,0,1,'active','2025-10-17 09:21:40',NULL,'2025-10-17 09:21:40','2025-10-17 09:34:47'),(59,'Transparent Labs PreSeries','transparent-labs-preseries','PRE-TL-BULK',2,4,'Pre-workout trong suốt không chất độn','PreSeries BULK với 100% công thức minh bạch, không chất tạo màu, hương liệu nhân tạo.',NULL,NULL,NULL,1150000.00,1350000.00,NULL,1,90,10,NULL,NULL,NULL,NULL,'/uploads/dca9c3e6c1028dd2aefcfa338be77d7b.png',NULL,NULL,NULL,1,1,0,1,'active','2025-10-17 09:21:40',NULL,'2025-10-17 09:21:40','2025-10-17 09:34:56'),(60,'Caffeine Pills 200mg','caffeine-pills-200mg','PRE-CAFF-100',4,4,'Viên uống caffeine tinh khiết','Caffeine 200mg/viên, tăng tập trung và năng lượng nhanh chóng. 100 viên/hộp.',NULL,NULL,NULL,180000.00,220000.00,NULL,1,300,10,NULL,NULL,NULL,NULL,'/uploads/af919dedba033c79b88d778355c810a09.png',NULL,NULL,NULL,0,0,1,1,'active','2025-10-17 09:21:40',NULL,'2025-10-17 09:21:40','2025-10-17 09:35:00'),(61,'Magnesium Glycinate 400mg','magnesium-glycinate-400mg','VIT-MAG-120',4,2,'Magnesium hấp thụ cao nhất','Magnesium Glycinate dạng chelate dễ hấp thụ, hỗ trợ giấc ngủ, giảm căng cơ và stress.',NULL,NULL,NULL,320000.00,400000.00,NULL,1,180,10,NULL,NULL,NULL,NULL,'/uploads/20e2a5107de107e5b876a2bf35e8ecc693.png',NULL,NULL,NULL,1,1,0,1,'active','2025-10-17 09:21:40',NULL,'2025-10-17 09:21:40','2025-10-17 09:35:32'),(62,'Vitamin K2 + D3','vitamin-k2-d3','VIT-K2D3-90',4,2,'Vitamin K2 MK-7 kết hợp D3','K2 (MK-7) 100mcg + D3 5000 IU, hỗ trợ xương chắc khỏe, hấp thủ canxi vào xương.',NULL,NULL,NULL,380000.00,480000.00,NULL,1,150,10,NULL,NULL,NULL,NULL,'/uploads/af44f6de65710bfa4fe5f102b76931b5d6.png',NULL,NULL,NULL,1,0,1,1,'active','2025-10-17 09:21:40',NULL,'2025-10-17 09:21:40','2025-10-17 09:35:36'),(63,'Probiotics 50 Billion CFU','probiotics-50-billion','VIT-PROB-60',4,2,'Men vi sinh 50 tỷ CFU','Probiotics với 50 tỷ CFU, 10 chủng vi khuẩn có lợi. Hỗ trợ tiêu hóa và hệ miễn dịch.',NULL,NULL,NULL,580000.00,680000.00,NULL,1,120,10,NULL,NULL,NULL,NULL,'/uploads/c174b88ea11bd86c410435b2a9d17f898.png',NULL,NULL,NULL,0,1,1,1,'active','2025-10-17 09:21:40',NULL,'2025-10-17 09:21:40','2025-10-17 09:35:39'),(64,'CoQ10 200mg','coq10-200mg','VIT-COQ10-60',4,2,'Coenzyme Q10 tăng năng lượng','CoQ10 200mg dạng Ubiquinone, hỗ trợ tim mạch, tăng năng lượng tế bào.',NULL,NULL,NULL,450000.00,550000.00,NULL,1,100,10,NULL,NULL,NULL,NULL,'/uploads/9e0a7be2d59cb5dccb7455a77de1064c8.png',NULL,NULL,NULL,0,0,0,1,'active','2025-10-17 09:21:40',NULL,'2025-10-17 09:21:40','2025-10-17 09:35:42'),(65,'Turmeric Curcumin 1500mg','turmeric-curcumin-1500mg','VIT-TURMERIC-90',4,2,'Nghệ vàng chống viêm mạnh','Curcumin chiết xuất từ nghệ vàng 1500mg với BioPerine tăng hấp thụ. Chống viêm, hỗ trợ khớp.',NULL,NULL,NULL,380000.00,480000.00,NULL,1,200,10,NULL,NULL,NULL,NULL,'/uploads/c2466e10bdc310a374f79771d14db795ea.png',NULL,NULL,NULL,1,1,0,1,'active','2025-10-17 09:21:40',NULL,'2025-10-17 09:21:40','2025-10-17 09:35:45'),(67,'Weightlifting Belt - Leather Pro','weightlifting-belt-leather-v2','GYM-BELT-002-V2',2,3,'Thắt lưng tập Gym da thật, bảo vệ cột sống','Thắt lưng tập Gym da bò thật 100%, độ dày 10mm, rộng 10cm. Thiết kế 2 lớp đai thép chắc chắn, khóa kim loại bền. Hỗ trợ cột sống khi Squat, Deadlift nặng. Size M, L, XL.',NULL,NULL,NULL,750000.00,850000.00,NULL,1,80,10,NULL,NULL,NULL,NULL,'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800',NULL,NULL,NULL,1,0,1,1,'active',NULL,NULL,'2025-10-17 09:39:27','2025-10-17 09:39:27'),(68,'Gym Gloves Pro - Anti-Slip','gym-gloves-pro-v2','GYM-GLOVE-003-V2',3,3,'Găng tay tập Gym chống trượt, thông hơi','Găng tay tập Gym chuyên nghiệp với lớp đệm Silicon chống trượt, vải Mesh thông hơi. Thiết kế hở ngón, có quấn cổ tay hỗ trợ. Phù hợp tập tạ, xà đơn, xà kép. Size S, M, L, XL.',NULL,NULL,NULL,220000.00,1500000.00,NULL,1,150,10,NULL,NULL,NULL,NULL,'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800',NULL,NULL,NULL,0,1,0,0,'active',NULL,NULL,'2025-10-17 09:39:27','2025-11-17 04:58:12'),(69,'Resistance Bands Set - 5 Levels','resistance-bands-set-v2','GYM-BAND-004-V2',4,3,'Bộ dây kháng lực 5 mức độ, tập tại nhà','Bộ 5 dây kháng lực Latex cao cấp với 5 mức độ khác nhau (5-25 lbs). Kèm theo 2 tay cầm, 2 dây đeo mắt cá, 1 neo cửa, túi đựng. Tập toàn thân, phù hợp tập tại nhà hoặc mang đi du lịch.',NULL,NULL,NULL,320000.00,380000.00,NULL,1,120,10,NULL,NULL,NULL,NULL,'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800',NULL,NULL,NULL,0,0,0,1,'active',NULL,NULL,'2025-10-17 09:39:27','2025-10-17 09:39:27'),(70,'Shaker Bottle 700ml - BPA Free','shaker-bottle-700ml-v2','GYM-SHAKE-005-V2',1,3,'Bình lắc Protein cao cấp, không BPA','Bình lắc Protein 700ml bằng nhựa Tritan không BPA, có lưới lọc kim loại inox. Nắp đậy chắc chắn, không đổ rò. Có vạch chia ml rõ ràng. Dễ vệ sinh, an toàn cho sức khỏe. Màu đen, trắng, xanh.',NULL,NULL,NULL,120000.00,1500000.00,NULL,1,300,10,NULL,NULL,NULL,NULL,'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800',NULL,NULL,NULL,0,1,1,0,'active',NULL,NULL,'2025-10-17 09:39:27','2025-11-17 04:58:12'),(71,'C4 Original Pre-Workout 60 servings','c4-original-preworkout-v2','PRE-C4-001-V2',1,4,'Pre-workout bán chạy nhất thế giới, tăng năng lượng','C4 Original là pre-workout số 1 Mỹ với 150mg Caffeine, Beta-Alanine, Creatine Nitrate. Tăng năng lượng, tập trung, sức bền. Vị Fruit Punch, Blue Razz, Watermelon. 60 lần dùng.',NULL,NULL,NULL,680000.00,750000.00,NULL,1,100,10,NULL,NULL,NULL,NULL,'https://images.unsplash.com/photo-1579722820308-d74e571900a9?w=800',NULL,NULL,NULL,1,0,1,1,'active',NULL,NULL,'2025-10-17 09:39:27','2025-10-17 09:39:27'),(72,'Pre-JYM Pre-Workout 30 servings','pre-jym-preworkout-v2','PRE-JYM-002-V2',2,4,'Pre-workout khoa học, công thức Jim Stoppani','Pre-JYM của Jim Stoppani PhD với 13 thành phần khoa học: 300mg Caffeine, 6g Citrulline Malate, 2g Beta-Alanine, 2g Creatine HCl. Tăng pump, sức mạnh, tập trung. Vị Cherry Limeade, Orange Citrus. 30 servings.',NULL,NULL,NULL,880000.00,980000.00,NULL,1,60,10,NULL,NULL,NULL,NULL,'https://images.unsplash.com/photo-1579722820308-d74e571900a9?w=800',NULL,NULL,NULL,1,0,0,1,'active',NULL,NULL,'2025-10-17 09:39:27','2025-10-17 09:39:27'),(73,'NO-Xplode Pre-Workout 60 servings','no-xplode-preworkout-v2','PRE-NOX-003-V2',3,4,'Pre-workout cổ điển BSN, pump cực mạnh','BSN NO-Xplode với Creatine Blend, Beta-Alanine, Caffeine 275mg. Công thức cải tiến, tăng NO, pump cơ cực mạnh. Vị Fruit Punch, Grape, Blue Raz. 60 servings.',NULL,NULL,NULL,680000.00,1500000.00,NULL,1,80,10,NULL,NULL,NULL,NULL,'https://images.unsplash.com/photo-1579722820308-d74e571900a9?w=800',NULL,NULL,NULL,0,1,1,0,'active',NULL,NULL,'2025-10-17 09:39:27','2025-11-17 04:58:12'),(74,'Transparent Labs PreSeries BULK 30 servings','transparent-labs-preseries-v2','PRE-TL-004-V2',4,4,'Pre-workout sạch nhất, không chất độn','Transparent Labs PreSeries BULK - pre-workout 100% trong sạch, không chất độn. Công thức: 8g Citrulline Malate, 4g Beta-Alanine, 4g BCAA, 180mg Caffeine. Tăng cơ, sức mạnh. Vị Green Apple, Strawberry Lemonade. 30 servings.',NULL,NULL,NULL,1050000.00,1150000.00,NULL,1,40,10,NULL,NULL,NULL,NULL,'https://images.unsplash.com/photo-1579722820308-d74e571900a9?w=800',NULL,NULL,NULL,1,0,0,1,'active',NULL,NULL,'2025-10-17 09:39:27','2025-10-17 09:39:27'),(75,'Caffeine Pills 200mg - 100 tablets','caffeine-pills-200mg-v2','PRE-CAFF-005-V2',1,4,'Viên Caffeine tinh khiết, tăng tập trung nhanh','Viên Caffeine 200mg tinh khiết USP grade. Giúp tỉnh táo, tập trung, tăng chuyển hóa mỡ. Dùng trước tập 30 phút hoặc buổi sáng. 100 viên, 100 lần dùng. Giá cực tốt thay thế pre-workout đắt tiền.',NULL,NULL,NULL,180000.00,1500000.00,NULL,1,200,10,NULL,NULL,NULL,NULL,'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800',NULL,NULL,NULL,0,1,0,0,'active',NULL,NULL,'2025-10-17 09:39:27','2025-11-17 04:58:12'),(76,'Magnesium Glycinate 400mg - 120 caps','magnesium-glycinate-400mg-v2','VIT-MAG-001-V2',1,2,'Magnesium hấp thu tốt nhất, hỗ trợ giấc ngủ','Magnesium Glycinate 400mg - dạng Chelate hấp thu cao nhất, không gây tiêu chảy. Hỗ trợ giấc ngủ sâu, giảm căng thẳng, co thắt cơ. Quan trọng cho vận động viên. 120 viên, 120 ngày.',NULL,NULL,NULL,280000.00,320000.00,NULL,1,150,10,NULL,NULL,NULL,NULL,'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800',NULL,NULL,NULL,0,0,1,1,'active',NULL,NULL,'2025-10-17 09:39:27','2025-10-17 09:39:27'),(77,'Vitamin K2 (MK-7) + D3 - 60 capsules','vitamin-k2-d3-v2','VIT-K2D3-002-V2',2,2,'Combo K2 + D3, hỗ trợ xương khớp tối ưu','Vitamin K2 (MK-7) 100mcg + Vitamin D3 5000IU. Hỗ trợ hấp thu Canxi vào xương, không lắng đọng mạch máu. Tăng sức khỏe xương, khớp, tim mạch. 60 viên, 2 tháng.',NULL,NULL,NULL,380000.00,1500000.00,NULL,1,100,10,NULL,NULL,NULL,NULL,'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800',NULL,NULL,NULL,1,1,0,0,'active',NULL,NULL,'2025-10-17 09:39:27','2025-11-17 04:58:12'),(78,'Probiotics 50 Billion CFU - 60 caps','probiotics-50-billion-v2','VIT-PROB-003-V2',3,2,'Men vi sinh 50 tỷ CFU, cải thiện tiêu hóa','Probiotics 50 Billion CFU với 10 chủng vi khuẩn có lợi. Hỗ trợ tiêu hóa, hấp thu dinh dưỡng, miễn dịch. Đặc biệt quan trọng khi dùng nhiều Protein. Công nghệ bảo quản không cần tủ lạnh. 60 viên, 2 tháng.',NULL,NULL,NULL,520000.00,580000.00,NULL,1,80,10,NULL,NULL,NULL,NULL,'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800',NULL,NULL,NULL,0,0,0,1,'active',NULL,NULL,'2025-10-17 09:39:27','2025-10-17 09:39:27'),(79,'CoQ10 200mg - Ubiquinol Form - 60 softgels','coq10-200mg-ubiquinol-v2','VIT-COQ10-004-V2',4,2,'CoQ10 dạng Ubiquinol, tăng năng lượng tế bào','CoQ10 200mg dạng Ubiquinol - dạng hoạt tính hấp thu tốt hơn Ubiquinone 8 lần. Tăng năng lượng, hỗ trợ tim mạch, chống oxy hóa. Quan trọng khi tập luyện cường độ cao. 60 viên dạng softgel, 2 tháng.',NULL,NULL,NULL,450000.00,1500000.00,NULL,1,70,10,NULL,NULL,NULL,NULL,'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800',NULL,NULL,NULL,1,0,0,0,'active',NULL,NULL,'2025-10-17 09:39:27','2025-11-17 04:58:12'),(81,'Áo Tank Top Gym Nam MuscleFit','ao-tank-top-gym-nam-musclefit','APP-TT001',1,11,'Áo ba lỗ thể hình MuscleFit co giãn thoáng mát.','Áo tank top dành cho gymer giúp khoe cơ bắp và thoải mái khi tập luyện.',NULL,'Mặc trong khi tập gym, giặt bằng tay hoặc máy nhẹ.','Không dùng nước tẩy.',299000.00,399000.00,150000.00,1,100,5,NULL,'BT202501','Việt Nam','MuscleFit Co.','/uploads/c108afb6d39a92889b702f2d1edcef45.png','[\"/images/products/ao-tank-top-musclefit-1.jpg\", \"/images/products/ao-tank-top-musclefit-2.jpg\"]','Áo tank top gym nam MuscleFit','Áo ba lỗ thể hình MuscleFit dành cho gymer.',1,1,0,1,'active','2025-10-20 05:53:00',NULL,'2025-10-20 05:53:00','2025-11-19 08:02:12'),(82,'Áo Thun Tập Gym Nam Dry-Fit','ao-thun-tap-gym-nam-dryfit','APP-TS002',2,11,'Áo thun thể thao khô nhanh Dry-Fit.','Chất liệu thấm hút mồ hôi nhanh, giúp bạn luôn khô ráo khi tập luyện.',NULL,'Phù hợp tập gym, chạy bộ, thể thao ngoài trời.','Không ủi ở nhiệt độ cao.',350000.00,450000.00,200000.00,1,120,10,NULL,'BT202502','Thái Lan','Nike Fitness','/uploads/d65c75eb10be022ad93760d4c7aaf025d.png','[\"/images/products/ao-thun-dryfit-1.jpg\", \"/images/products/ao-thun-dryfit-2.jpg\"]','Áo thun DryFit nam','Áo thun tập gym nam DryFit cao cấp, co giãn 4 chiều.',1,1,1,0,'active','2025-10-20 05:53:00',NULL,'2025-10-20 05:53:00','2025-11-19 08:02:46'),(83,'Quần Short Gym Nam FlexPro','quan-short-gym-nam-flexpro','APP-SH003',1,11,'Quần short tập gym FlexPro thoáng mát, nhẹ.','Chất vải co giãn 4 chiều, thiết kế hiện đại, phù hợp mọi buổi tập.',NULL,'Mặc trong khi tập luyện.','Không phơi dưới ánh nắng gắt.',320000.00,420000.00,180000.00,1,80,5,NULL,'BT202503','Việt Nam','FlexPro Apparel','/images/products/quan-short-flexpro.jpg','[\"/images/products/quan-short-flexpro-1.jpg\", \"/images/products/quan-short-flexpro-2.jpg\"]','Quần short gym FlexPro','Quần short thể hình chất lượng cao, co giãn thoải mái.',0,1,0,1,'active','2025-10-20 05:53:00',NULL,'2025-10-20 05:53:00','2025-11-17 05:17:01'),(84,'Áo Hoodie Gym Unisex WarmFit','ao-hoodie-gym-unisex-warmfit','APP-HD004',3,11,'Áo hoodie thể thao giữ ấm WarmFit.','Thích hợp cho tập gym buổi sáng, thời tiết lạnh hoặc đi chơi.',NULL,'Mặc như áo khoác hoặc khi khởi động.','Tránh giặt bằng nước nóng.',490000.00,590000.00,280000.00,1,60,5,NULL,'BT202504','Trung Quốc','WarmFit Wear','/images/products/ao-hoodie-warmfit.jpg','[\"/images/products/ao-hoodie-warmfit-1.jpg\"]','Áo hoodie gym Unisex','Áo hoodie thể thao giữ ấm, phong cách và năng động.',1,0,0,1,'active','2025-10-20 05:53:00',NULL,'2025-10-20 05:53:00','2025-11-17 05:17:01'),(85,'Áo Ba Lỗ Gym Nữ ShapeFit','ao-ba-lo-gym-nu-shapefit','APP-TT005',2,11,'Áo ba lỗ nữ ShapeFit tôn dáng, thoáng khí.','Áo tank top nữ giúp tôn vóc dáng, co giãn 4 chiều.',NULL,'Phù hợp tập gym, yoga, fitness.','Không giặt chung với đồ sẫm màu.',330000.00,430000.00,200000.00,1,70,5,NULL,'BT202505','Việt Nam','ShapeFit','/images/products/ao-tanktop-nu-shapefit.jpg','[\"/images/products/ao-tanktop-nu-shapefit-1.jpg\"]','Áo tank top nữ ShapeFit','Áo tập gym nữ thoải mái và thời trang.',1,1,0,0,'active','2025-10-20 05:53:00',NULL,'2025-10-20 05:53:00','2025-11-17 05:17:01'),(86,'Găng Tay Tập Gym GripMax','gang-tay-tap-gym-gripmax','APP-GL006',4,11,'Găng tay chống trượt khi nâng tạ GripMax.','Chống chai tay, tăng độ bám, bảo vệ cổ tay.',NULL,'Sử dụng khi tập tạ, kéo xà.','Không để ẩm ướt lâu ngày.',270000.00,350000.00,120000.00,1,90,10,NULL,'BT202506','Malaysia','GripMax Gear','/images/products/gang-tay-gripmax.jpg','[\"/images/products/gang-tay-gripmax-1.jpg\", \"/images/products/gang-tay-gripmax-2.jpg\"]','Găng tay tập gym GripMax','Găng tay chống trượt và bảo vệ tay khi tập.',0,0,1,1,'active','2025-10-20 05:53:00',NULL,'2025-10-20 05:53:00','2025-11-17 05:17:01'),(87,'Quần Legging Nữ GymPro','quan-legging-nu-gympro','APP-LG007',2,11,'Quần legging nữ GymPro co giãn 4 chiều.','Thiết kế ôm sát, thoáng khí và nâng đỡ cơ bắp.',NULL,'Mặc khi tập gym hoặc yoga.','Tránh tiếp xúc với vật sắc nhọn.',399000.00,499000.00,250000.00,1,85,5,NULL,'BT202507','Việt Nam','GymPro Fashion','/images/products/quan-legging-gympro.jpg','[\"/images/products/quan-legging-gympro-1.jpg\"]','Quần legging gym nữ GymPro','Legging nữ tập gym đẹp và thoải mái.',1,0,1,0,'active','2025-10-20 05:53:00',NULL,'2025-10-20 05:53:00','2025-11-17 05:17:01'),(88,'Mũ Lưỡi Trai GymStyle','mu-luoi-trai-gymstyle','APP-HT008',5,11,'Mũ thể thao phong cách cho gymer.','Chống nắng, thoáng khí, thời trang.',NULL,'Dùng khi tập ngoài trời hoặc đi chơi.','Không giặt máy.',190000.00,250000.00,100000.00,1,100,10,NULL,'BT202508','Việt Nam','GymStyle','/images/products/mu-gymstyle.jpg','[\"/images/products/mu-gymstyle-1.jpg\"]','Mũ thể thao GymStyle','Mũ lưỡi trai thời trang cho dân gym.',0,1,0,0,'active','2025-10-20 05:53:00',NULL,'2025-10-20 05:53:00','2025-11-17 05:17:01'),(89,'Túi Gym CarryPro','tui-gym-carrypro','APP-BG009',6,11,'Túi tập gym CarryPro tiện lợi, nhiều ngăn.','Thiết kế đựng giày riêng, chống nước nhẹ.',NULL,'Dùng để mang đồ tập hoặc du lịch.','Không giặt bằng máy.',450000.00,550000.00,300000.00,1,50,5,NULL,'BT202509','Trung Quốc','CarryPro Bags','/images/products/tui-gym-carrypro.jpg','[\"/images/products/tui-gym-carrypro-1.jpg\"]','Túi tập gym CarryPro','Túi thể thao cao cấp, tiện dụng cho gymer.',1,0,1,1,'active','2025-10-20 05:53:00',NULL,'2025-10-20 05:53:00','2025-11-17 05:17:01'),(90,'Đồ Bó Cơ CompressionFit','do-bo-co-compressionfit','APP-CM010',4,11,'Bộ đồ bó cơ CompressionFit tăng hiệu suất tập luyện.','Hỗ trợ lưu thông máu và phục hồi cơ nhanh hơn.',NULL,'Mặc khi tập gym hoặc thi đấu.','Không phơi trực tiếp dưới nắng.',590000.00,690000.00,350000.00,1,40,5,NULL,'BT202510','Hàn Quốc','CompressionFit Co.','/images/products/do-bo-co-compressionfit.jpg','[\"/images/products/do-bo-co-compressionfit-1.jpg\"]','Đồ bó cơ CompressionFit','Đồ bó cơ hỗ trợ tập luyện và hồi phục cơ.',1,1,1,0,'active','2025-10-20 05:53:00',NULL,'2025-10-20 05:53:00','2025-11-17 05:17:01'),(92,'Rule1 R1 Protein','rule1-r1-protein','SKU-WHEY-002',2,6,'Protein tinh khiết, hấp thu nhanh, không chất béo.','Rule1 Protein cung cấp 25g protein isolate mỗi khẩu phần.','Whey protein isolate, enzyme tiêu hóa, hương socola.','Uống 1 muỗng sau tập hoặc buổi sáng.','Không dùng nếu mẫn cảm với lactose.',1250000.00,1390000.00,900000.00,1,80,10,'2026-03-20','BATCH002','USA','Rule One Proteins','/uploads/27433446ccdd7c4671ec3ae106757e193.JPG','[\"/uploads/products/rule1-1.jpg\", \"/uploads/products/rule1-2.jpg\"]','Rule1 R1 Protein chính hãng','Whey isolate hấp thu nhanh, hỗ trợ tăng cơ nạc.',0,1,0,1,'active','2025-10-20 08:59:07',NULL,'2025-10-20 08:59:07','2025-11-18 13:28:19'),(93,'MyProtein Impact Whey','myprotein-impact-whey','SKU-WHEY-003',3,6,'Whey protein isolate nhập khẩu Anh Quốc.','Impact Whey cung cấp 21g protein mỗi khẩu phần, ít đường và chất béo.','Whey protein concentrate, hương vanilla.','Uống 1 muỗng với nước lạnh hoặc sữa tươi sau khi tập.','Không sử dụng cho người không dung nạp lactose.',950000.00,1100000.00,700000.00,1,150,15,'2026-07-15','BATCH003','UK','MyProtein','/uploads/ac5c1057c9683ea4ed5a605c5f40f1bc2.png','[\"/uploads/products/myprotein-1.jpg\", \"/uploads/products/myprotein-2.jpg\"]','Impact Whey Protein chính hãng','Whey protein hiệu quả, giá hợp lý cho người mới tập.',0,1,0,0,'active','2025-10-20 08:59:07',NULL,'2025-10-20 08:59:07','2025-11-18 14:34:09'),(94,'Iso 100 Dymatize','iso-100-dymatize','SKU-WHEY-004',4,6,'Whey isolate thủy phân hấp thu siêu nhanh.','Iso100 chứa 25g protein isolate tinh khiết, ít carb và không đường.','Whey isolate thủy phân, enzyme tiêu hóa.','Uống 1 muỗng sau buổi tập hoặc buổi sáng.','Không sử dụng cho trẻ em dưới 16 tuổi.',1850000.00,1990000.00,1300000.00,1,60,5,'2026-08-10','BATCH004','USA','Dymatize Nutrition','/uploads/c52320553ab6efe9e69227174b54cbbc.png','[\"/uploads/products/iso100-1.jpg\", \"/uploads/products/iso100-2.jpg\"]','Iso 100 Dymatize Whey Protein','Whey isolate cao cấp giúp hấp thu nhanh, phục hồi tối ưu.',1,0,1,1,'active','2025-10-20 08:59:07',NULL,'2025-10-20 08:59:07','2025-11-19 07:36:35'),(95,'Mutant Whey','mutant-whey','SKU-WHEY-005',5,6,'Whey blend tăng cơ mạnh mẽ cho người tập nặng.','Hỗn hợp whey isolate, concentrate và casein giúp phát triển cơ tối đa.','Whey isolate, concentrate, casein, enzyme tiêu hóa.','Uống 1-2 muỗng sau khi tập luyện.','Không dùng quá 3 khẩu phần/ngày.',1150000.00,1300000.00,800000.00,1,90,10,'2026-02-05','BATCH005','Canada','Mutant','/uploads/da6046a4e14b58bc9264710b99242f1d1.png','[\"/uploads/products/mutant-whey-1.jpg\", \"/uploads/products/mutant-whey-2.jpg\"]','Mutant Whey Protein tăng cơ hiệu quả','Whey hỗn hợp tăng cơ nhanh, phù hợp người tập nặng.',0,0,1,1,'active','2025-10-20 08:59:07',NULL,'2025-10-20 08:59:07','2025-11-19 07:36:58'),(96,'Whey Serious Mass','whey-serious-mass','SKU-WHEY-006',1,6,'Sữa tăng cân, tăng cơ cho người gầy.','Mỗi khẩu phần chứa 50g protein và 1250 calo.','Maltodextrin, whey protein, vitamin, khoáng chất.','Uống 1 muỗng buổi sáng và sau tập.','Không dùng thay thế bữa ăn chính.',1450000.00,1600000.00,1050000.00,1,70,10,'2026-04-25','BATCH006','USA','Optimum Nutrition','/uploads/8687db462960a188f946ce432939b459.png','[\"/uploads/products/seriousmass-1.jpg\", \"/uploads/products/seriousmass-2.jpg\"]','Serious Mass tăng cân nhanh','Sữa tăng cân hiệu quả, bổ sung năng lượng và cơ bắp.',1,0,1,0,'active','2025-10-20 08:59:07',NULL,'2025-10-20 08:59:07','2025-11-19 07:37:12'),(97,'Whey Isolate Bulk Sports','whey-isolate-bulk-sports','SKU-WHEY-007',6,6,'Whey isolate cao cấp đến từ Nhật Bản.','Bulk Sports cung cấp 27g protein isolate tinh khiết, không lactose.','Whey isolate, BCAA, enzyme tiêu hóa.','Uống 1 muỗng sau tập hoặc buổi sáng.','Không dùng cho người dị ứng protein sữa.',1650000.00,1800000.00,1200000.00,1,50,5,'2026-09-30','BATCH007','Japan','Bulk Sports','/uploads/f9ebb1a41e790b1b31070719395b102fc6.png','[\"/uploads/products/bulk-isolate-1.jpg\", \"/uploads/products/bulk-isolate-2.jpg\"]','Whey Isolate Bulk Sports Nhật Bản','Protein tinh khiết, dễ hấp thu, phù hợp người nhạy cảm.',0,1,0,1,'active','2025-10-20 08:59:07',NULL,'2025-10-20 08:59:07','2025-11-19 07:37:32'),(98,'Elite Whey Protein','elite-whey-protein','SKU-WHEY-008',4,6,'Whey isolate kết hợp concentrate giúp phục hồi nhanh.','Cung cấp 24g protein và 5.5g BCAA mỗi khẩu phần.','Whey protein isolate, concentrate, BCAA.','Uống 1 muỗng sau tập hoặc buổi sáng.','Không dùng cho phụ nữ mang thai.',1180000.00,1290000.00,850000.00,1,100,10,'2026-06-12','BATCH008','USA','Dymatize Nutrition','/uploads/13e5b3c6acfb71073773115740c8efb8.png','[\"/uploads/products/elite-whey-1.jpg\", \"/uploads/products/elite-whey-2.jpg\"]','Elite Whey Protein chính hãng','Hỗ trợ phục hồi cơ nhanh, tăng sức mạnh tập luyện.',0,0,1,1,'active','2025-10-20 08:59:07',NULL,'2025-10-20 08:59:07','2025-11-19 07:39:20'),(99,'Whey Blend ON','whey-blend-on','SKU-WHEY-009',1,6,'Whey hỗn hợp tăng cơ hiệu quả, giá tốt.','Hỗn hợp whey isolate và concentrate cân bằng dinh dưỡng.','Whey isolate, concentrate, hương socola.','Uống 1 muỗng mỗi ngày sau tập.','Không vượt quá 3 muỗng/ngày.',11000.00,12000.00,10000.00,1,110,10,'2026-11-15','BATCH009','USA','Optimum Nutrition','/uploads/f0f8be1fb23b92fad190ac23b8e51875.png','[\"/uploads/products/whey-blend-1.jpg\", \"/uploads/products/whey-blend-2.jpg\"]','ON Whey Blend chính hãng','Whey hỗn hợp giúp tăng cơ và phục hồi nhanh.',0,1,0,0,'active','2025-10-20 08:59:07',NULL,'2025-10-20 08:59:07','2025-11-19 06:07:40'),(100,'Hydro Whey Platinum','hydro-whey-platinum','SKU-WHEY-010',1,6,'Whey thủy phân cao cấp hấp thu nhanh nhất.','Mỗi khẩu phần cung cấp 30g protein tinh khiết, không lactose.','Hydrolyzed whey isolate, enzyme tiêu hóa.','Uống 1 muỗng sau tập hoặc trước ngủ.','Không sử dụng quá liều khuyến nghị.',2100000.00,2290000.00,1550000.00,1,40,5,'2026-12-20','BATCH010','USA','Optimum Nutrition','/uploads/222765d12e7647689cd1013c7454dd680.png','[\"/uploads/products/hydro-whey-1.jpg\", \"/uploads/products/hydro-whey-2.jpg\"]','Hydro Whey Platinum chính hãng','Whey thủy phân cao cấp, hấp thu nhanh, phục hồi cơ tối đa.',1,0,1,1,'active','2025-10-20 08:59:07',NULL,'2025-10-20 08:59:07','2025-11-19 08:01:09'),(101,'proteinbar','proteinbar','sku-161',6,1,'bổ sung nhanh','sjh',NULL,NULL,NULL,120000.00,150000.00,NULL,1,12,10,NULL,NULL,NULL,NULL,'/uploads/8e71093a72c8b0f6d3b5ad81c94e53c20.jpg',NULL,NULL,NULL,0,0,0,0,'active',NULL,NULL,'2025-11-18 12:54:16','2025-11-18 14:47:25'),(102,'whey-gold-standard-5lbs','whey-gold-standard-5lbs','WHEY-001',7,1,'Whey protein hỗ trợ tăng cơ nhanh, hấp thụ tốt.','Công thức whey isolate tinh khiết, 24g protein mỗi serving, ít chất béo, dễ tan',NULL,NULL,NULL,1580000.00,1400000.00,NULL,1,45,10,NULL,NULL,NULL,NULL,'/uploads/c571cbf1ba10fc8e7a10884dc295e506e8.jpg',NULL,NULL,NULL,0,0,0,0,'active',NULL,NULL,'2025-11-19 17:55:19','2025-11-19 17:55:19'),(103,'Rule1 Whey Blend 5lbs','rule1-whey-blend-5lbs','WHEY-002',3,1,'Whey isolate hấp thu nhanh dùng sau tập.','Bổ sung 25g protein/serving, tăng tốc độ tổng hợp cơ.',NULL,NULL,NULL,1350000.00,1650000.00,NULL,1,1545,10,NULL,NULL,NULL,NULL,'/uploads/d90c109f5a7d5fb55104c04475a2197759.jpg',NULL,NULL,NULL,0,0,0,0,'active',NULL,NULL,'2025-11-19 17:57:10','2025-11-19 17:57:10'),(104,'iso-surge-2lbs','iso-surge-2lbs','WHEY-003',3,1,'Whey isolate hấp thu nhanh dùng sau tập.','ổ sung 25g protein/serving, tăng tốc độ tổng hợp cơ.',NULL,NULL,NULL,950000.00,750000.00,NULL,1,111,10,NULL,NULL,NULL,NULL,'/uploads/ce46e171a1f9ec15fafcf1e4749ab224.jpg',NULL,NULL,NULL,0,0,0,0,'active',NULL,NULL,'2025-11-19 17:58:52','2025-11-19 17:58:52'),(105,'Serious Mass 12lbs','serious-mass-12lbs','MASS-001',1,2,'Mass tăng cân cho người gầy khó hấp thụ.','1250 calories mỗi serving, 50g protein và nhiều vitamin khoáng.',NULL,NULL,NULL,1350000.00,1650000.00,NULL,1,321,10,NULL,NULL,NULL,NULL,'/uploads/153d3eb2d6466ff78f3f2fc5fb988f52.jpg',NULL,NULL,NULL,0,0,0,0,'active',NULL,NULL,'2025-11-19 18:00:59','2025-11-19 18:00:59'),(106,'Mass Tech Extreme 2000','mass-tech-extreme-2000','MASS-002',10,2,'ăng cân mạnh cho người tập thể hình chuyên nghiệp.','Công thức carbohydrate + protein giúp tăng cơ bền vững.',NULL,NULL,NULL,1750000.00,2050000.00,NULL,1,60,10,NULL,NULL,NULL,NULL,'/uploads/71fa5f6101181ea795b5ee2f81c67bc70.jpg',NULL,NULL,NULL,0,0,0,0,'active',NULL,NULL,'2025-11-19 18:02:45','2025-11-19 18:02:45'),(107,'Mass 15lbs','mass-15lbs','MASS-003',1,2,'Tăng cân nhanh, hương vị dễ uống.','Protein blend, carbs sạch, giúp tăng cơ và sức mạnh.',NULL,NULL,NULL,1690000.00,1950000.00,NULL,1,45,10,NULL,NULL,NULL,NULL,'/uploads/cf962a9e6c10d1442fc41ee669f1c84d8.jpg',NULL,NULL,NULL,0,0,0,0,'active',NULL,NULL,'2025-11-19 18:05:41','2025-11-19 18:05:41'),(108,'BCAA ON 250g','bcaa-on-250g','BCAA-001',4,4,'Giúp chống dị hóa cơ và phục hồi nhanh.','leucine – isoleucine – valine hỗ trợ tái tạo mô cơ.',NULL,NULL,NULL,450000.00,600000.00,NULL,1,233,10,NULL,NULL,NULL,NULL,'/uploads/2e910e4531b2603d6d42e0fbc1ef2d5b1.jpg',NULL,NULL,NULL,0,0,0,0,'active',NULL,NULL,'2025-11-19 18:08:10','2025-11-19 18:08:10'),(109,'Xtend BCAA 90 servings','xtend-bcaa-90-servings','BCAA-002',4,4,'hương trái cây giải khát dễ uống.','Bổ sung điện giải, hỗ trợ tập kéo dài không mệt.',NULL,NULL,NULL,890000.00,1150000.00,NULL,1,130,10,NULL,NULL,NULL,NULL,'/uploads/410f30fa5f4ada656f7bc69c44ca81c10f.jpg',NULL,NULL,NULL,0,0,0,0,'active',NULL,NULL,'2025-11-19 18:09:50','2025-11-19 18:09:50'),(110,'Creatine Monohydrate ON','creatine-monohydrate-on','CRE-001',10,4,'Tăng sức mạnh và hiệu suất tập luyện.','Creatine tinh khiết, giúp tăng sức mạnh và bơm cơ tốt',NULL,NULL,NULL,550000.00,750000.00,NULL,1,313,10,NULL,NULL,NULL,NULL,'/uploads/c4a191916a03926c3abac6104bb20c1cb.jpg',NULL,NULL,NULL,0,0,0,0,'active',NULL,NULL,'2025-11-19 18:12:18','2025-11-19 18:12:18'),(111,'Creatine Evlution 500g','creatine-evlution-500g','CRE-002',5,5,'Creatine tinh khiết cho vận động viên.','Nâng cao khả năng phục hồi và sức mạnh cơ bắp.',NULL,NULL,NULL,780000.00,1000000.00,NULL,1,34,10,NULL,NULL,NULL,NULL,'/uploads/fd4b6dad245c2b39e11c13db2dbb4e04.jpg',NULL,NULL,NULL,0,0,0,0,'active',NULL,NULL,'2025-11-19 18:13:43','2025-11-19 18:13:43'),(112,'Pre-workout C4 60 servings','pre-workout-c4-60-servings','PRE-001',2,5,': Tăng năng lượng & tập sung hơn.','Beta alanine + caffeine hỗ trợ bơm cơ tối đa.',NULL,NULL,NULL,880000.00,1150000.00,NULL,1,32,10,NULL,NULL,NULL,NULL,'/uploads/a109ed8c1952ae1f4c7c19101864299a7c.jpg',NULL,NULL,NULL,0,0,0,0,'active',NULL,NULL,'2025-11-19 18:15:23','2025-11-19 18:15:23'),(113,'Multivitamin Animal Pak','multivitamin-animal-pak','VIT-001',11,5,'Vitamin phức hợp dành cho gymer chuyên nghiệp.','Cung cấp hơn 50 vitamin khoáng, tăng miễn dịch & thể lực.',NULL,NULL,NULL,950000.00,1250000.00,NULL,1,85,10,NULL,NULL,NULL,NULL,'/uploads/e4ec9b1f9d80c858c3f1dba6b35d8e510.jpg',NULL,NULL,NULL,0,0,0,0,'active',NULL,NULL,'2025-11-19 18:58:15','2025-11-19 18:58:30'),(114,'Omega 3 Fish Oil 1000mg','omega-3-fish-oil-1000mg','VIT-003',3,3,'Tốt cho tim mạch, trí nhớ, mắt.','Hàm lượng EPA + DHA chuẩn thể thao.',NULL,NULL,NULL,350000.00,490000.00,NULL,1,31,10,NULL,NULL,NULL,NULL,'/uploads/4220e1982f34fd3107d9b888deec494d9.jpg',NULL,NULL,NULL,0,0,0,0,'active',NULL,NULL,'2025-11-19 18:59:28','2025-11-19 18:59:28'),(120,'Whey Protein Gold Standard','whey-protein-gold-standard','SKU-WHEY-001',1,6,'Bột whey protein giúp tăng cơ, phục hồi nhanh sau tập luyện.','Sản phẩm whey protein chất lượng cao chứa 24g protein tinh khiết mỗi khẩu phần.','Whey protein isolate, concentrate, hương vanilla tự nhiên.','Uống 1 muỗng với 250ml nước hoặc sữa sau khi tập.','Không dùng cho người dị ứng sữa.',1350000.00,1500000.00,950000.00,1,120,10,'2026-05-01','BATCH001','USA','Optimum Nutrition','/uploads/c8d10430cb6cc5ef8f105754c12a4a4866.jpg','[\"/uploads/products/whey-gold-1.jpg\", \"/uploads/products/whey-gold-2.jpg\"]','Whey Protein Gold Standard','Whey tăng cơ nhanh, phục hồi cơ bắp hiệu quả.',1,0,1,1,'active','2025-11-19 19:16:02',1,'2025-11-19 19:16:02','2025-11-19 19:29:39'),(151,'\'Whey Protein Gold Standar','whey-protein-gold-standar','WHEY-001434',9,9,'Whey protein isolate, concentrate, hương vanilla tự nhiên','Uống 1 muỗng với 250ml nước hoặc sữa sau khi tập.',NULL,NULL,NULL,1350000.00,1500000.00,NULL,1,13,10,NULL,NULL,NULL,NULL,'/uploads/c10293dfa411a88823fcf9c25065106cd7.jpg',NULL,NULL,NULL,0,0,0,0,'active',NULL,NULL,'2025-11-19 19:29:23','2025-11-19 19:29:23'),(155,'iso-100-dymatize23','iso-100-dymatize23','SKU-WHEY-003332',4,2,'Whey isolate thủy phân, enzyme tiêu hóa.','Uống 1 muỗng sau buổi tập hoặc buổi sáng.\n\nwarnings: Không sử dụng cho trẻ em dưới 16 tuổi.',NULL,NULL,NULL,1850000.00,1990000.00,NULL,1,23,10,NULL,NULL,NULL,NULL,'/uploads/01d3c465352b93b362b2d48afb54015c.jpg',NULL,NULL,NULL,0,0,0,0,'active',NULL,NULL,'2025-11-19 19:32:23','2025-11-19 19:32:23');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchase_order_items`
--

DROP TABLE IF EXISTS `purchase_order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchase_order_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `purchase_order_id` int NOT NULL,
  `product_id` int NOT NULL,
  `variant_id` int DEFAULT NULL,
  `quantity_ordered` int NOT NULL,
  `quantity_received` int DEFAULT '0',
  `unit_cost` decimal(10,2) NOT NULL,
  `total_cost` decimal(10,2) NOT NULL,
  `notes` text,
  PRIMARY KEY (`id`),
  KEY `idx_purchase_order` (`purchase_order_id`),
  KEY `idx_product` (`product_id`),
  CONSTRAINT `purchase_order_items_ibfk_1` FOREIGN KEY (`purchase_order_id`) REFERENCES `purchase_orders` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchase_order_items`
--

LOCK TABLES `purchase_order_items` WRITE;
/*!40000 ALTER TABLE `purchase_order_items` DISABLE KEYS */;
INSERT INTO `purchase_order_items` VALUES (1,1,1,NULL,100,100,50000.00,5000000.00,'Whey Protein 2kg - 100 hộp'),(2,2,2,NULL,150,0,50000.00,7500000.00,'BCAA Powder 500g - 150 hộp'),(3,3,3,NULL,80,0,40000.00,3200000.00,'Multivitamin 100 viên - 80 hộp'),(4,4,4,NULL,90,0,50000.00,4500000.00,'Organic Protein Bar - 90 hộp'),(5,5,5,NULL,70,70,40000.00,2800000.00,'Resistance Bands Set - 70 bộ'),(6,1,2,NULL,100,100,50000.00,5000000.00,'Whey Protein 2kg - 100 hộp'),(7,2,3,NULL,150,0,50000.00,7500000.00,'BCAA Powder 500g - 150 hộp'),(8,3,4,NULL,80,0,40000.00,3200000.00,'Multivitamin 100 viên - 80 hộp'),(9,4,5,NULL,90,0,50000.00,4500000.00,'Organic Protein Bar - 90 hộp'),(10,5,6,NULL,70,70,40000.00,2800000.00,'Resistance Bands Set - 70 bộ');
/*!40000 ALTER TABLE `purchase_order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchase_orders`
--

DROP TABLE IF EXISTS `purchase_orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchase_orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `supplier_id` int DEFAULT NULL,
  `order_number` varchar(50) NOT NULL,
  `status` enum('draft','pending','approved','received','cancelled') DEFAULT 'draft',
  `total_amount` decimal(10,2) DEFAULT '0.00',
  `notes` text,
  `expected_delivery_date` date DEFAULT NULL,
  `received_date` date DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `order_number` (`order_number`),
  KEY `idx_supplier` (`supplier_id`),
  KEY `idx_status` (`status`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchase_orders`
--

LOCK TABLES `purchase_orders` WRITE;
/*!40000 ALTER TABLE `purchase_orders` DISABLE KEYS */;
INSERT INTO `purchase_orders` VALUES (1,1,'PO20241124001','received',5000000.00,'Đơn nhập hàng whey protein tháng 11','2024-11-20',NULL,1,'2024-11-15 03:00:00','2025-11-24 04:15:37'),(2,2,'PO20241124002','approved',7500000.00,'Đơn nhập hàng thực phẩm bổ sung','2024-11-25',NULL,1,'2024-11-18 07:30:00','2025-11-24 04:15:37'),(3,3,'PO20241124003','approved',3200000.00,'Đơn nhập hàng vitamin và khoáng chất','2024-11-28',NULL,1,'2024-11-20 02:15:00','2025-11-24 05:12:28'),(4,4,'PO20241124004','draft',4500000.00,'Đơn nhập hàng sản phẩm organic','2024-12-01',NULL,1,'2024-11-22 09:45:00','2025-11-24 04:15:37'),(5,5,'PO20241124005','received',2800000.00,'Đơn nhập hàng thiết bị thể thao','2024-11-22',NULL,1,'2024-11-19 04:20:00','2025-11-24 04:15:37');
/*!40000 ALTER TABLE `purchase_orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shipment_tracking`
--

DROP TABLE IF EXISTS `shipment_tracking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shipment_tracking` (
  `id` int NOT NULL AUTO_INCREMENT,
  `shipment_id` int NOT NULL,
  `status` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `location` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `timestamp` timestamp NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_shipment` (`shipment_id`),
  KEY `idx_timestamp` (`timestamp`),
  CONSTRAINT `shipment_tracking_ibfk_1` FOREIGN KEY (`shipment_id`) REFERENCES `shipments` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shipment_tracking`
--

LOCK TABLES `shipment_tracking` WRITE;
/*!40000 ALTER TABLE `shipment_tracking` DISABLE KEYS */;
/*!40000 ALTER TABLE `shipment_tracking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shipments`
--

DROP TABLE IF EXISTS `shipments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shipments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `carrier_id` int NOT NULL,
  `tracking_number` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('pending','picked_up','in_transit','out_for_delivery','delivered','failed','returned') COLLATE utf8mb4_unicode_ci DEFAULT 'pending',
  `shipping_fee` decimal(10,2) NOT NULL,
  `weight` decimal(10,2) DEFAULT NULL,
  `dimensions` json DEFAULT NULL,
  `pickup_address` text COLLATE utf8mb4_unicode_ci,
  `delivery_address` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `delivery_city` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `delivery_district` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `delivery_ward` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `delivery_postal_code` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `recipient_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `recipient_phone` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `notes` text COLLATE utf8mb4_unicode_ci,
  `picked_up_at` timestamp NULL DEFAULT NULL,
  `in_transit_at` timestamp NULL DEFAULT NULL,
  `out_for_delivery_at` timestamp NULL DEFAULT NULL,
  `delivered_at` timestamp NULL DEFAULT NULL,
  `failed_at` timestamp NULL DEFAULT NULL,
  `returned_at` timestamp NULL DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tracking_number` (`tracking_number`),
  UNIQUE KEY `uk_tracking_number` (`tracking_number`),
  KEY `idx_order` (`order_id`),
  KEY `idx_carrier` (`carrier_id`),
  KEY `idx_status` (`status`),
  KEY `idx_created_at` (`created_at`),
  CONSTRAINT `shipments_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `shipments_ibfk_2` FOREIGN KEY (`carrier_id`) REFERENCES `shipping_carriers` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shipments`
--

LOCK TABLES `shipments` WRITE;
/*!40000 ALTER TABLE `shipments` DISABLE KEYS */;
/*!40000 ALTER TABLE `shipments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shipping_carriers`
--

DROP TABLE IF EXISTS `shipping_carriers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shipping_carriers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `api_endpoint` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `api_key` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `contact_phone` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `contact_email` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `notes` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  UNIQUE KEY `uk_code` (`code`),
  KEY `idx_is_active` (`is_active`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shipping_carriers`
--

LOCK TABLES `shipping_carriers` WRITE;
/*!40000 ALTER TABLE `shipping_carriers` DISABLE KEYS */;
INSERT INTO `shipping_carriers` VALUES (1,'Vietnam Post','vietnam_post',NULL,NULL,'19006017','support@vietnampost.vn',1,'Bưu điện Việt Nam','2025-11-24 04:49:13','2025-11-24 04:49:13'),(2,'Giao Hàng Tiết Kiệm','ghtk',NULL,NULL,'19006017','support@ghtk.vn',1,'GHTK','2025-11-24 04:49:13','2025-11-24 04:49:13'),(3,'Giao Hàng Nhanh','ghn',NULL,NULL,'19006017','support@ghn.vn',1,'GHN','2025-11-24 04:49:13','2025-11-24 04:49:13'),(4,'J&T Express','jt',NULL,NULL,'19006017','support@jtexpress.vn',1,'J&T Express','2025-11-24 04:49:13','2025-11-24 04:49:13'),(5,'Ninja Van','ninja_van',NULL,NULL,'19006017','support@ninjavan.vn',1,'Ninja Van','2025-11-24 04:49:13','2025-11-24 04:49:13');
/*!40000 ALTER TABLE `shipping_carriers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shipping_rates`
--

DROP TABLE IF EXISTS `shipping_rates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shipping_rates` (
  `id` int NOT NULL AUTO_INCREMENT,
  `carrier_id` int NOT NULL,
  `zone_id` int NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `min_weight` decimal(10,2) DEFAULT '0.00',
  `max_weight` decimal(10,2) DEFAULT NULL,
  `base_fee` decimal(10,2) NOT NULL,
  `fee_per_kg` decimal(10,2) DEFAULT '0.00',
  `estimated_days` int DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `priority` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_carrier` (`carrier_id`),
  KEY `idx_zone` (`zone_id`),
  KEY `idx_is_active` (`is_active`),
  CONSTRAINT `shipping_rates_ibfk_1` FOREIGN KEY (`carrier_id`) REFERENCES `shipping_carriers` (`id`) ON DELETE CASCADE,
  CONSTRAINT `shipping_rates_ibfk_2` FOREIGN KEY (`zone_id`) REFERENCES `shipping_zones` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shipping_rates`
--

LOCK TABLES `shipping_rates` WRITE;
/*!40000 ALTER TABLE `shipping_rates` DISABLE KEYS */;
INSERT INTO `shipping_rates` VALUES (1,1,1,'Giao hàng tiêu chuẩn nội thành Hà Nội',0.00,5.00,20000.00,5000.00,2,1,1,'2025-11-24 05:06:27','2025-11-24 05:06:27'),(2,2,3,'Giao hàng nhanh nội thành TP.HCM',0.00,10.00,25000.00,3000.00,1,1,1,'2025-11-24 05:06:27','2025-11-24 05:06:27'),(3,3,3,'Giao hàng siêu tốc nội thành TP.HCM',0.00,5.00,35000.00,5000.00,1,1,0,'2025-11-24 05:06:27','2025-11-24 05:06:27'),(4,4,5,'Giao hàng toàn quốc',0.00,NULL,30000.00,8000.00,3,1,1,'2025-11-24 05:06:27','2025-11-24 05:06:27'),(5,5,1,'Giao hàng công nghệ nội thành Hà Nội',0.00,20.00,22000.00,4000.00,2,1,1,'2025-11-24 05:06:27','2025-11-24 05:06:27');
/*!40000 ALTER TABLE `shipping_rates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shipping_zones`
--

DROP TABLE IF EXISTS `shipping_zones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shipping_zones` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `provinces` json DEFAULT NULL,
  `districts` json DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  UNIQUE KEY `uk_code` (`code`),
  KEY `idx_is_active` (`is_active`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shipping_zones`
--

LOCK TABLES `shipping_zones` WRITE;
/*!40000 ALTER TABLE `shipping_zones` DISABLE KEYS */;
INSERT INTO `shipping_zones` VALUES (1,'Nội thành Hà Nội','hanoi_inner','[\"Hà Nội\"]','[\"Ba Đình\", \"Hoàn Kiếm\", \"Hai Bà Trưng\", \"Đống Đa\", \"Tây Hồ\", \"Cầu Giấy\", \"Thanh Xuân\", \"Hoàng Mai\", \"Long Biên\"]',1,'2025-11-24 05:06:27','2025-11-24 05:06:27'),(2,'Ngoại thành Hà Nội','hanoi_outer','[\"Hà Nội\"]',NULL,1,'2025-11-24 05:06:27','2025-11-24 05:06:27'),(3,'Nội thành TP.HCM','hcmc_inner','[\"TP.HCM\"]','[\"Quận 1\", \"Quận 2\", \"Quận 3\", \"Quận 4\", \"Quận 5\", \"Quận 6\", \"Quận 7\", \"Quận 8\", \"Quận 9\", \"Quận 10\", \"Quận 11\", \"Quận 12\", \"Bình Thạnh\", \"Tân Bình\", \"Tân Phú\", \"Phú Nhuận\", \"Gò Vấp\"]',1,'2025-11-24 05:06:27','2025-11-24 05:06:27'),(4,'Ngoại thành TP.HCM','hcmc_outer','[\"TP.HCM\"]',NULL,1,'2025-11-24 05:06:27','2025-11-24 05:06:27'),(5,'Toàn quốc','nationwide','[\"Hà Nội\", \"TP.HCM\", \"Đà Nẵng\", \"Hải Phòng\", \"Cần Thơ\"]',NULL,0,'2025-11-24 05:06:27','2025-11-24 05:07:12');
/*!40000 ALTER TABLE `shipping_zones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shippings`
--

DROP TABLE IF EXISTS `shippings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shippings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `carrier` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'GHTK, GHN, J&T, Viettel Post',
  `service_type` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Standard, Express, Same day',
  `tracking_number` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `estimated_delivery_date` date DEFAULT NULL,
  `shipped_date` timestamp NULL DEFAULT NULL,
  `delivered_date` timestamp NULL DEFAULT NULL,
  `status` enum('pending','picked_up','in_transit','out_for_delivery','delivered','failed_delivery','returned') COLLATE utf8mb4_unicode_ci DEFAULT 'pending',
  `shipping_fee` decimal(10,2) DEFAULT NULL,
  `insurance_fee` decimal(10,2) DEFAULT '0.00',
  `cod_fee` decimal(10,2) DEFAULT '0.00',
  `notes` text COLLATE utf8mb4_unicode_ci,
  `delivery_attempts` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_order` (`order_id`),
  KEY `idx_tracking` (`tracking_number`),
  KEY `idx_status` (`status`),
  CONSTRAINT `shippings_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shippings`
--

LOCK TABLES `shippings` WRITE;
/*!40000 ALTER TABLE `shippings` DISABLE KEYS */;
INSERT INTO `shippings` VALUES (1,1,'GHTK','Standard','TK001','2025-10-05','2025-10-02 02:00:00','2025-10-03 07:00:00','delivered',50000.00,0.00,0.00,NULL,1,'2025-10-01 03:00:00','2025-10-11 03:28:23'),(2,2,'GHN','Express','TK002','2025-10-06','2025-10-03 03:00:00',NULL,'in_transit',30000.00,10000.00,0.00,NULL,0,'2025-10-02 04:00:00','2025-10-11 03:28:23'),(3,3,'J&T','Standard','TK003','2025-10-07',NULL,NULL,'pending',50000.00,0.00,0.00,NULL,0,'2025-10-03 05:00:00','2025-10-11 03:28:23'),(4,4,'Viettel Post','Express','TK004','2025-10-08',NULL,NULL,'picked_up',30000.00,0.00,0.00,NULL,0,'2025-10-04 06:00:00','2025-10-11 03:28:23'),(5,5,'GHTK','Standard','TK005','2025-10-09','2025-10-06 02:00:00','2025-10-07 07:00:00','delivered',50000.00,0.00,0.00,NULL,1,'2025-10-05 07:00:00','2025-10-11 03:28:23'),(6,6,'GHN','Standard','TK006','2025-10-10',NULL,NULL,'pending',30000.00,0.00,20000.00,'COD fee',0,'2025-10-06 08:00:00','2025-10-11 03:28:23'),(7,7,'J&T','Express','TK007','2025-10-11',NULL,NULL,'',30000.00,0.00,0.00,'Hủy đơn',0,'2025-10-07 09:00:00','2025-10-11 03:28:23'),(8,8,'Viettel Post','Standard','TK008','2025-10-12','2025-10-09 03:00:00',NULL,'out_for_delivery',50000.00,0.00,0.00,NULL,0,'2025-10-08 10:00:00','2025-10-11 03:28:23'),(9,9,'GHTK','Express','TK009','2025-10-13',NULL,NULL,'picked_up',30000.00,10000.00,0.00,NULL,0,'2025-10-09 11:00:00','2025-10-11 03:28:23'),(10,10,'GHN','Standard','TK010','2025-10-14',NULL,NULL,'pending',30000.00,0.00,0.00,NULL,0,'2025-10-10 12:00:00','2025-10-11 03:28:23');
/*!40000 ALTER TABLE `shippings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stores`
--

DROP TABLE IF EXISTS `stores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stores` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `hotline` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `support_phone` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `opening_hours` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` text COLLATE utf8mb4_unicode_ci,
  `map_link` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `latitude` decimal(10,8) DEFAULT NULL,
  `longitude` decimal(11,8) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `marquee_text` text COLLATE utf8mb4_unicode_ci,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stores`
--

LOCK TABLES `stores` WRITE;
/*!40000 ALTER TABLE `stores` DISABLE KEYS */;
INSERT INTO `stores` VALUES (1,'GYM XÃ ĐÀN','398 Xã Đàn, Quận Đống Đa, Hà Nội','0886 39 88 39','1800.2067','service@gymstore.vn','8:00h - 22:00h','https://gymstore.vn/images/showroom-xadan.jpg','https://www.google.com/maps/place/398+Xã+Đàn,+Đống+Đa,+Hà+Nội','Showroom chính thức tại Hà Nội, trưng bày đầy đủ sản phẩm dinh dưỡng thể hình chính hãng.',21.01189000,105.83065000,1,'Cửa hàng 1 - FREESHIP toàn quốc!','2025-10-23 22:51:24','2025-10-24 00:34:45'),(2,'GYMSTORE NGUYỄN TRÃI','276 Nguyễn Trãi, Thanh Xuân, Hà Nội','0866 62 88 39','1800.2067','service@gymstore.vn','8:00h - 22:00h','https://gymstore.vn/images/showroom-nguyentrai.jpg','https://www.google.com/maps/place/276+Nguyễn+Trãi,+Thanh+Xuân,+Hà+Nội','Cửa hàng trưng bày sản phẩm whey, mass, phụ kiện gym và thiết bị tập luyện chính hãng.',21.00251800,105.81533400,1,'Cửa hàng 2 - Giảm giá 50%!','2025-10-23 22:51:24','2025-10-24 00:34:45'),(3,'GYMSTORE CẦU GIẤY','97 Cầu Giấy, Quận Cầu Giấy, Hà Nội','0838 62 88 39','1800.2067','service@gymstore.vn','8:00h - 22:00h','https://gymstore.vn/images/showroom-caugiay.jpg','https://www.google.com/maps/place/97+Cầu+Giấy,+Hà+Nội','Chi nhánh phía Tây Hà Nội, thuận tiện cho sinh viên và dân văn phòng khu vực Cầu Giấy.',21.03787000,105.80046000,1,'Cửa hàng 3 - Gọi ngay để tư vấn!','2025-10-23 22:51:24','2025-10-24 00:34:45'),(4,'GYMSTORE NGUYỄN HUỆ','45 Nguyễn Huệ, Quận 1, TP.HCM','0909 88 77 66','1800.2067','hcm@gymstore.vn','8:00h - 22:00h','https://gymstore.vn/images/showroom-nguyenhue.jpg','https://www.google.com/maps/place/45+Nguyễn+Huệ,+Quận+1,+TP.HCM','Showroom trung tâm Sài Gòn, trưng bày đa dạng sản phẩm thể hình quốc tế.',10.77689100,106.70089700,1,'Cửa hàng 4 - Quà tặng hấp dẫn!','2025-10-23 22:51:24','2025-10-24 00:34:45'),(5,'GYMSTORE TÂN BÌNH','20 Cộng Hòa, Phường 12, Quận Tân Bình, TP.HCM','0909 66 55 44','1800.2067','hcm@gymstore.vn','8:00h - 22:00h','https://gymstore.vn/images/showroom-tanbinh.jpg','https://www.google.com/maps/place/20+Cộng+Hòa,+Tân+Bình,+TP.HCM','Chi nhánh khu vực sân bay, chuyên phục vụ gymer khu vực phía Tây TP.HCM.',10.80107000,106.65234000,1,'Cửa hàng 5 - Ưu đãi cuối tuần!','2025-10-23 22:51:24','2025-10-24 00:34:45');
/*!40000 ALTER TABLE `stores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `suppliers`
--

DROP TABLE IF EXISTS `suppliers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `suppliers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `contact_person` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `address` text,
  `tax_code` varchar(50) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `notes` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `suppliers`
--

LOCK TABLES `suppliers` WRITE;
/*!40000 ALTER TABLE `suppliers` DISABLE KEYS */;
INSERT INTO `suppliers` VALUES (1,'Công ty TNHH Dinh Dưỡng Thể Thao ABC','Nguyễn Văn An','contact@abc-nutrition.com','0912345678','123 Đường Lê Lợi, Quận 1, TP.HCM','0123456789',1,'Nhà cung cấp chính cho sản phẩm whey protein','2025-11-24 04:15:37','2025-11-24 04:15:37'),(2,'Công ty CP Thực Phẩm Thể Thao XYZ','Trần Thị Bình','info@xyz-sports.com','0987654321','456 Đường Nguyễn Huệ, Quận 3, TP.HCM','0987654321',1,'Chuyên cung cấp thực phẩm bổ sung','2025-11-24 04:15:37','2025-11-24 04:15:37'),(3,'Công ty TNHH Thể Thao & Sức Khỏe DEF','Lê Văn Cường','sales@def-health.com','0901234567','789 Đường Pasteur, Quận 3, TP.HCM','0111222333',1,'Nhà cung cấp vitamin và khoáng chất','2025-11-24 04:15:37','2025-11-24 04:15:37'),(4,'Công ty CP Dinh Dưỡng GHI','Phạm Thị Dung','contact@ghi-nutrition.com','0923456789','321 Đường Điện Biên Phủ, Quận Bình Thạnh, TP.HCM','0444555666',1,'Chuyên sản phẩm organic và tự nhiên','2025-11-24 04:15:37','2025-11-24 04:15:37'),(5,'Công ty TNHH Thể Thao JKL','Hoàng Văn Em','info@jkl-sports.com','0934567890','654 Đường Cách Mạng Tháng 8, Quận 10, TP.HCM','0777888999',1,'Nhà cung cấp thiết bị và phụ kiện thể thao','2025-11-24 04:15:37','2025-11-24 04:15:37'),(6,'Công ty TNHH Dinh Dưỡng Thể Thao ABC','Nguyễn Văn An','contact@abc-nutrition.com','0912345678','123 Đường Lê Lợi, Quận 1, TP.HCM','0123456789',1,'Nhà cung cấp chính cho sản phẩm whey protein','2025-11-24 04:16:33','2025-11-24 04:16:33'),(7,'Công ty CP Thực Phẩm Thể Thao XYZ','Trần Thị Bình','info@xyz-sports.com','0987654321','456 Đường Nguyễn Huệ, Quận 3, TP.HCM','0987654321',1,'Chuyên cung cấp thực phẩm bổ sung','2025-11-24 04:16:33','2025-11-24 04:16:33'),(8,'Công ty TNHH Thể Thao & Sức Khỏe DEF','Lê Văn Cường','sales@def-health.com','0901234567','789 Đường Pasteur, Quận 3, TP.HCM','0111222333',1,'Nhà cung cấp vitamin và khoáng chất','2025-11-24 04:16:33','2025-11-24 04:16:33'),(9,'Công ty CP Dinh Dưỡng GHI','Phạm Thị Dung','contact@ghi-nutrition.com','0923456789','321 Đường Điện Biên Phủ, Quận Bình Thạnh, TP.HCM','0444555666',1,'Chuyên sản phẩm organic và tự nhiên','2025-11-24 04:16:33','2025-11-24 04:16:33'),(10,'Công ty TNHH Thể Thao JKL','Hoàng Văn Em','info@jkl-sports.com','0934567890','654 Đường Cách Mạng Tháng 8, Quận 10, TP.HCM','0777888999',1,'Nhà cung cấp thiết bị và phụ kiện thể thao','2025-11-24 04:16:33','2025-11-24 04:16:33'),(11,'Công ty TNHH Dinh Dưỡng Thể Thao ABC','Nguyễn Văn An','contact@abc-nutrition.com','0912345678','123 Đường Lê Lợi, Quận 1, TP.HCM','0123456789',1,'Nhà cung cấp chính cho sản phẩm whey protein','2025-11-24 04:17:26','2025-11-24 04:17:26'),(12,'Công ty CP Thực Phẩm Thể Thao XYZ','Trần Thị Bình','info@xyz-sports.com','0987654321','456 Đường Nguyễn Huệ, Quận 3, TP.HCM','0987654321',1,'Chuyên cung cấp thực phẩm bổ sung','2025-11-24 04:17:26','2025-11-24 04:17:26'),(13,'Công ty TNHH Thể Thao & Sức Khỏe DEF','Lê Văn Cường','sales@def-health.com','0901234567','789 Đường Pasteur, Quận 3, TP.HCM','0111222333',1,'Nhà cung cấp vitamin và khoáng chất','2025-11-24 04:17:26','2025-11-24 04:17:26'),(14,'Công ty CP Dinh Dưỡng GHI','Phạm Thị Dung','contact@ghi-nutrition.com','0923456789','321 Đường Điện Biên Phủ, Quận Bình Thạnh, TP.HCM','0444555666',1,'Chuyên sản phẩm organic và tự nhiên','2025-11-24 04:17:26','2025-11-24 04:17:26'),(15,'Công ty TNHH Thể Thao JKL','Hoàng Văn Em','info@jkl-sports.com','0934567890','654 Đường Cách Mạng Tháng 8, Quận 10, TP.HCM','0777888999',1,'Nhà cung cấp thiết bị và phụ kiện thể thao','2025-11-24 04:17:26','2025-11-24 04:17:26');
/*!40000 ALTER TABLE `suppliers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `system_settings`
--

DROP TABLE IF EXISTS `system_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `system_settings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `setting_key` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `setting_value` text COLLATE utf8mb4_unicode_ci,
  `setting_type` enum('string','number','boolean','json') COLLATE utf8mb4_unicode_ci DEFAULT 'string',
  `description` text COLLATE utf8mb4_unicode_ci,
  `is_public` tinyint(1) DEFAULT '0' COMMENT 'Có thể truy cập từ frontend',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `setting_key` (`setting_key`),
  KEY `idx_key` (`setting_key`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `system_settings`
--

LOCK TABLES `system_settings` WRITE;
/*!40000 ALTER TABLE `system_settings` DISABLE KEYS */;
INSERT INTO `system_settings` VALUES (1,'site_name','GymShop VN','string','Tên website',1,'2025-10-11 02:09:04','2025-10-11 02:09:04'),(2,'site_description','Cửa hàng thể thao và thực phẩm bổ sung hàng đầu Việt Nam','string','Mô tả website',1,'2025-10-11 02:09:04','2025-10-11 02:09:04'),(3,'free_shipping_threshold','1500000','number','Miễn phí ship từ số tiền',1,'2025-10-11 02:09:04','2025-10-11 02:09:04'),(4,'default_currency','VND','string','Đơn vị tiền tệ',1,'2025-10-11 02:09:04','2025-10-11 02:09:04'),(5,'tax_rate','10','number','Thuế VAT (%)',0,'2025-10-11 02:09:04','2025-10-11 02:09:04'),(6,'points_per_vnd','1000','number','Số VNĐ = 1 điểm thưởng',1,'2025-10-11 02:09:04','2025-10-11 02:09:04'),(7,'contact_email','contact@gymshop.vn','string','Email liên hệ',1,'2025-10-11 03:28:23','2025-10-11 03:28:23'),(8,'social_facebook','https://fb.com/gymshop','string','Link Facebook',1,'2025-10-11 03:28:23','2025-10-11 03:28:23'),(9,'enable_reviews','true','boolean','Bật đánh giá sản phẩm',0,'2025-10-11 03:28:23','2025-10-11 03:28:23'),(10,'max_cart_items','50','number','Số lượng item tối đa trong giỏ',0,'2025-10-11 03:28:23','2025-10-11 03:28:23');
/*!40000 ALTER TABLE `system_settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified` tinyint(1) DEFAULT '0',
  `phone` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `full_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gender` enum('male','female','other') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `avatar_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` text COLLATE utf8mb4_unicode_ci,
  `city` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `district` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ward` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `postal_code` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role_id` int DEFAULT NULL COMMENT 'Null nếu là customer',
  `customer_tier_id` int DEFAULT '1',
  `loyalty_points` int DEFAULT '0',
  `total_spent` decimal(12,2) DEFAULT '0.00',
  `is_active` tinyint(1) DEFAULT '1',
  `last_login` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  KEY `role_id` (`role_id`),
  KEY `idx_email` (`email`),
  KEY `idx_phone` (`phone`),
  KEY `idx_customer_tier` (`customer_tier_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `admin_roles` (`id`) ON DELETE SET NULL,
  CONSTRAINT `users_ibfk_2` FOREIGN KEY (`customer_tier_id`) REFERENCES `customer_tiers` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (3,'user3','$2y$10$examplehash3','user3@example.com',0,'0903333333','Lê Văn C','male','1985-03-03',NULL,'789 Đường DEF','Hà Nội','Ba Đình','Phúc Xá','10000',NULL,3,500,8000000.00,1,'2025-10-03 05:00:00','2025-10-11 03:09:33','2025-10-11 03:09:33'),(4,'user4','$2y$10$examplehash4','user4@example.com',1,'0904444444','Phạm Thị D','female','1995-04-04',NULL,'101 Đường GHI','TP. HCM','Quận 3','Võ Thị Sáu','70000',NULL,1,100,1000000.00,1,'2025-10-04 06:00:00','2025-10-11 03:09:33','2025-10-11 03:09:33'),(5,'user5','$2y$10$examplehash5','user5@example.com',1,'0905555555','Hoàng Văn E','male','1988-05-05',NULL,'202 Đường JKL','Hà Nội','Hoàn Kiếm','Hàng Bạc','10000',NULL,4,800,12000000.00,1,'2025-10-05 07:00:00','2025-10-11 03:09:33','2025-10-11 03:09:33'),(7,'user7','$2y$10$examplehash7','user7@example.com',1,'0907777777','Đặng Văn G','male','1980-07-07',NULL,'404 Đường PQR','Hà Nội','Thanh Xuân','Khương Đình','10000',NULL,5,1200,25000000.00,1,'2025-10-07 09:00:00','2025-10-11 03:09:33','2025-10-11 03:09:33'),(8,'user8','$2y$10$examplehash8','user8@example.com',1,'0908888888','Bùi Thị H','female','1991-08-08',NULL,'505 Đường STU','TP. HCM','Bình Thạnh','Phú Thọ','70000',NULL,1,50,500000.00,1,'2025-10-08 10:00:00','2025-10-11 03:09:33','2025-10-11 03:09:33'),(9,'user9','$2y$10$examplehash9','user9@example.com',0,'0909999999','Ngô Văn I','male','1987-09-09',NULL,'606 Đường VWX','Hà Nội','Đống Đa','Quảng An','10000',NULL,3,400,6000000.00,0,'2025-10-09 11:00:00','2025-10-11 03:09:33','2025-11-15 03:53:24'),(10,'user10','$2y$10$examplehash10','user10@example.com',1,'0900000000','Lý Thị K','female','1994-10-10',NULL,'707 Đường YZ','TP. HCM','Quận 10','Tây Thạnh','70000',NULL,1,75,1500000.00,1,'2025-10-10 12:00:00','2025-10-11 03:09:33','2025-10-11 03:09:33'),(11,'dongbeo','$2a$10$YZRYrm.x09zuoSN4wr/TuufAK1a4jXmTqoFuoj0dOj1VfsbsJKWgS','dongbeo@example.com',0,'0987654321','Đông Béo',NULL,NULL,NULL,'123 Đường ABC',NULL,NULL,NULL,NULL,1,1,0,0.00,1,NULL,'2025-10-11 12:46:09','2025-11-14 07:46:27'),(12,'tesqqewt1324','$2a$10$A.Ivmso9nc/Ee5BfcIwp..HDrFFHMxbmmru8/oX198QkMsXhYdoni','tesqưqewt1324@example.com',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,0.00,1,NULL,'2025-10-11 12:58:21','2025-10-11 12:58:21'),(13,'dong6','$2a$10$zcdH/tWHEwUitM/2kHnIZeEC4N9zIvicj/d3lFgbmvwlnsqxm3xba','dong6@gmail.com',0,'0972067899','thanh',NULL,NULL,NULL,'thanh hóa',NULL,NULL,NULL,NULL,3,1,0,0.00,1,NULL,'2025-10-24 05:52:57','2025-11-15 03:40:21'),(14,'dongbeo16','$2a$10$YLT5QgSGqegFiTTjln4.E.LHvxMP.Zqa/H2hsIycWZeyWImNlc/AO','dongbeo16@gmail.com',0,NULL,'dongbeo',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,0.00,1,NULL,'2025-11-15 03:35:19','2025-11-15 03:35:19'),(15,'newuser','$2a$10$fD4nsod.azXTSieVitB72OVf5/rVnDwUnjRkTYt97zG76ESCazR/S','newuser@example.com',0,'0987654321','Nguyễn Văn A',NULL,NULL,NULL,'123 Đường ABC',NULL,NULL,NULL,NULL,2,1,0,0.00,1,NULL,'2025-11-15 04:05:12','2025-11-15 04:05:12'),(17,'agdgeagea','$2a$10$Mj3tklh6bDnAU81ShP4S7OrKUzUviHw1jx9sIJfYbbolmP1mAg2TG','dongbeo16@gmail.co',0,'hdtjd','sdƯDWfwf',NULL,NULL,NULL,'dhd',NULL,NULL,NULL,NULL,3,1,0,0.00,1,NULL,'2025-11-15 05:02:11','2025-11-15 05:02:11'),(18,'dong61','$2a$10$BM87IfvBorPkEQKMMU6Ya.wnaUngq9oqOwa9meY1g8J5l7PWvNIay','dong61@gmail.com',0,NULL,'edsd',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,0.00,1,NULL,'2025-11-17 19:16:25','2025-11-17 19:16:25');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `v_orders_summary`
--

DROP TABLE IF EXISTS `v_orders_summary`;
/*!50001 DROP VIEW IF EXISTS `v_orders_summary`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `v_orders_summary` AS SELECT 
 1 AS `id`,
 1 AS `order_number`,
 1 AS `user_id`,
 1 AS `customer_name`,
 1 AS `customer_email`,
 1 AS `customer_phone`,
 1 AS `shipping_address`,
 1 AS `shipping_city`,
 1 AS `shipping_district`,
 1 AS `shipping_ward`,
 1 AS `shipping_postal_code`,
 1 AS `subtotal`,
 1 AS `shipping_fee`,
 1 AS `tax_amount`,
 1 AS `discount_amount`,
 1 AS `total_amount`,
 1 AS `status`,
 1 AS `payment_status`,
 1 AS `notes`,
 1 AS `admin_notes`,
 1 AS `discount_code`,
 1 AS `handled_by`,
 1 AS `order_date`,
 1 AS `confirmed_at`,
 1 AS `shipped_at`,
 1 AS `delivered_at`,
 1 AS `cancelled_at`,
 1 AS `updated_at`,
 1 AS `username`,
 1 AS `user_email`,
 1 AS `customer_tier_id`,
 1 AS `customer_tier_name`,
 1 AS `total_items`,
 1 AS `total_quantity`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `v_products_full`
--

DROP TABLE IF EXISTS `v_products_full`;
/*!50001 DROP VIEW IF EXISTS `v_products_full`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `v_products_full` AS SELECT 
 1 AS `id`,
 1 AS `name`,
 1 AS `slug`,
 1 AS `sku`,
 1 AS `brand_id`,
 1 AS `category_id`,
 1 AS `short_description`,
 1 AS `description`,
 1 AS `ingredients`,
 1 AS `usage_instructions`,
 1 AS `warnings`,
 1 AS `price`,
 1 AS `compare_price`,
 1 AS `cost_price`,
 1 AS `track_inventory`,
 1 AS `inventory_quantity`,
 1 AS `low_stock_threshold`,
 1 AS `expiry_date`,
 1 AS `batch_number`,
 1 AS `origin_country`,
 1 AS `manufacturer`,
 1 AS `featured_image`,
 1 AS `image_gallery`,
 1 AS `meta_title`,
 1 AS `meta_description`,
 1 AS `is_featured`,
 1 AS `is_new_arrival`,
 1 AS `is_bestseller`,
 1 AS `is_on_sale`,
 1 AS `status`,
 1 AS `published_at`,
 1 AS `created_by`,
 1 AS `created_at`,
 1 AS `updated_at`,
 1 AS `brand_name`,
 1 AS `brand_slug`,
 1 AS `category_name`,
 1 AS `category_slug`,
 1 AS `category_parent_id`,
 1 AS `avg_rating`,
 1 AS `review_count`,
 1 AS `discount_percentage`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `warehouses`
--

DROP TABLE IF EXISTS `warehouses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `warehouses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` text COLLATE utf8mb4_unicode_ci,
  `city` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `manager_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_default` tinyint(1) DEFAULT '0',
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `warehouses`
--

LOCK TABLES `warehouses` WRITE;
/*!40000 ALTER TABLE `warehouses` DISABLE KEYS */;
INSERT INTO `warehouses` VALUES (1,'Kho Hà Nội','HN01','123 Đường ABC, Quận Cầu Giấy','Hà Nội','Nguyễn Văn A','0901234567',NULL,1,1,'2025-10-11 02:09:04'),(2,'Kho TP.HCM','HCM01','456 Đường XYZ, Quận 1','TP. Hồ Chí Minh','Trần Thị B','0907654321',NULL,0,1,'2025-10-11 02:09:04'),(3,'Kho Đà Nẵng','DN01','111 Đường Marina Bay','Đà Nẵng','Phạm Văn L','0901212121','l@warehouse.vn',0,1,'2025-10-11 03:09:33'),(4,'Kho Cần Thơ','CT01','222 Đường Ninh Kiều','Cần Thơ','Hồ Thị M','0902323232','m@warehouse.vn',0,1,'2025-10-11 03:09:33'),(5,'Kho Hải Phòng','HP01','333 Đường Lạch Tray','Hải Phòng','Vũ Văn N','0903434343','n@warehouse.vn',0,1,'2025-10-11 03:09:33'),(6,'Kho Nha Trang','NT01','444 Đường Trần Phú','Nha Trang','Lê Thị O','0904545454','o@warehouse.vn',0,1,'2025-10-11 03:09:33'),(7,'Kho Huế','HT01','555 Đường Lý Thường Kiệt','Huế','Trần Văn P','0905656565','p@warehouse.vn',0,1,'2025-10-11 03:09:33'),(8,'Kho Vũng Tàu','VT01','666 Đường Thùy Vân','Vũng Tàu','Nguyễn Thị Q','0906767676','q@warehouse.vn',0,1,'2025-10-11 03:09:33'),(9,'Kho Biên Hòa','BH01','777 Đường Phạm Văn Thuận','Biên Hòa','Đặng Văn R','0907878787','r@warehouse.vn',0,1,'2025-10-11 03:09:33'),(10,'Kho Quy Nhơn','QN01','888 Đường An Dương Vương','Quy Nhơn','Bùi Thị S','0908989898','s@warehouse.vn',0,1,'2025-10-11 03:09:33');
/*!40000 ALTER TABLE `warehouses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wishlists`
--

DROP TABLE IF EXISTS `wishlists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wishlists` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `product_id` int NOT NULL,
  `variant_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_user_product` (`user_id`,`product_id`,`variant_id`),
  KEY `product_id` (`product_id`),
  KEY `variant_id` (`variant_id`),
  KEY `idx_user` (`user_id`),
  CONSTRAINT `wishlists_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `wishlists_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  CONSTRAINT `wishlists_ibfk_3` FOREIGN KEY (`variant_id`) REFERENCES `product_variants` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wishlists`
--

LOCK TABLES `wishlists` WRITE;
/*!40000 ALTER TABLE `wishlists` DISABLE KEYS */;
INSERT INTO `wishlists` VALUES (4,3,4,4,'2025-10-03 05:00:00'),(5,4,5,5,'2025-10-04 06:00:00'),(6,5,6,6,'2025-10-05 07:00:00'),(8,7,8,8,'2025-10-07 09:00:00'),(9,8,9,9,'2025-10-08 10:00:00'),(10,9,10,NULL,'2025-10-09 11:00:00');
/*!40000 ALTER TABLE `wishlists` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'gymsinhvien'
--

--
-- Final view structure for view `v_orders_summary`
--

/*!50001 DROP VIEW IF EXISTS `v_orders_summary`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_orders_summary` AS select `o`.`id` AS `id`,`o`.`order_number` AS `order_number`,`o`.`user_id` AS `user_id`,`o`.`customer_name` AS `customer_name`,`o`.`customer_email` AS `customer_email`,`o`.`customer_phone` AS `customer_phone`,`o`.`shipping_address` AS `shipping_address`,`o`.`shipping_city` AS `shipping_city`,`o`.`shipping_district` AS `shipping_district`,`o`.`shipping_ward` AS `shipping_ward`,`o`.`shipping_postal_code` AS `shipping_postal_code`,`o`.`subtotal` AS `subtotal`,`o`.`shipping_fee` AS `shipping_fee`,`o`.`tax_amount` AS `tax_amount`,`o`.`discount_amount` AS `discount_amount`,`o`.`total_amount` AS `total_amount`,`o`.`status` AS `status`,`o`.`payment_status` AS `payment_status`,`o`.`notes` AS `notes`,`o`.`admin_notes` AS `admin_notes`,`o`.`discount_code` AS `discount_code`,`o`.`handled_by` AS `handled_by`,`o`.`order_date` AS `order_date`,`o`.`confirmed_at` AS `confirmed_at`,`o`.`shipped_at` AS `shipped_at`,`o`.`delivered_at` AS `delivered_at`,`o`.`cancelled_at` AS `cancelled_at`,`o`.`updated_at` AS `updated_at`,`u`.`username` AS `username`,`u`.`email` AS `user_email`,`u`.`customer_tier_id` AS `customer_tier_id`,`ct`.`name` AS `customer_tier_name`,count(`oi`.`id`) AS `total_items`,sum(`oi`.`quantity`) AS `total_quantity` from (((`orders` `o` left join `users` `u` on((`o`.`user_id` = `u`.`id`))) left join `customer_tiers` `ct` on((`u`.`customer_tier_id` = `ct`.`id`))) left join `order_items` `oi` on((`o`.`id` = `oi`.`order_id`))) group by `o`.`id` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_products_full`
--

/*!50001 DROP VIEW IF EXISTS `v_products_full`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_products_full` AS select `p`.`id` AS `id`,`p`.`name` AS `name`,`p`.`slug` AS `slug`,`p`.`sku` AS `sku`,`p`.`brand_id` AS `brand_id`,`p`.`category_id` AS `category_id`,`p`.`short_description` AS `short_description`,`p`.`description` AS `description`,`p`.`ingredients` AS `ingredients`,`p`.`usage_instructions` AS `usage_instructions`,`p`.`warnings` AS `warnings`,`p`.`price` AS `price`,`p`.`compare_price` AS `compare_price`,`p`.`cost_price` AS `cost_price`,`p`.`track_inventory` AS `track_inventory`,`p`.`inventory_quantity` AS `inventory_quantity`,`p`.`low_stock_threshold` AS `low_stock_threshold`,`p`.`expiry_date` AS `expiry_date`,`p`.`batch_number` AS `batch_number`,`p`.`origin_country` AS `origin_country`,`p`.`manufacturer` AS `manufacturer`,`p`.`featured_image` AS `featured_image`,`p`.`image_gallery` AS `image_gallery`,`p`.`meta_title` AS `meta_title`,`p`.`meta_description` AS `meta_description`,`p`.`is_featured` AS `is_featured`,`p`.`is_new_arrival` AS `is_new_arrival`,`p`.`is_bestseller` AS `is_bestseller`,`p`.`is_on_sale` AS `is_on_sale`,`p`.`status` AS `status`,`p`.`published_at` AS `published_at`,`p`.`created_by` AS `created_by`,`p`.`created_at` AS `created_at`,`p`.`updated_at` AS `updated_at`,`b`.`name` AS `brand_name`,`b`.`slug` AS `brand_slug`,`c`.`name` AS `category_name`,`c`.`slug` AS `category_slug`,`c`.`parent_id` AS `category_parent_id`,coalesce(avg(`pr`.`rating`),0) AS `avg_rating`,count(`pr`.`id`) AS `review_count`,(case when (`p`.`compare_price` > `p`.`price`) then round((((`p`.`compare_price` - `p`.`price`) / `p`.`compare_price`) * 100),0) else 0 end) AS `discount_percentage` from (((`products` `p` left join `brands` `b` on((`p`.`brand_id` = `b`.`id`))) left join `categories` `c` on((`p`.`category_id` = `c`.`id`))) left join `product_reviews` `pr` on(((`p`.`id` = `pr`.`product_id`) and (`pr`.`status` = 'approved')))) group by `p`.`id` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-25 11:05:19
