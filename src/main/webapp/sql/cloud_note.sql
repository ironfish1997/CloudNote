/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50720
 Source Host           : localhost
 Source Database       : cloud_note

 Target Server Type    : MySQL
 Target Server Version : 50720
 File Encoding         : utf-8

 Date: 06/06/2018 16:12:16 PM
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `cn_note`
-- ----------------------------
DROP TABLE IF EXISTS `cn_note`;
CREATE TABLE `cn_note` (
  `cn_note_id` varchar(100) NOT NULL COMMENT '笔记ID',
  `cn_notebook_id` varchar(100) NOT NULL COMMENT '笔记本ID',
  `cn_user_id` varchar(100) NOT NULL COMMENT '用户ID',
  `cn_note_status_id` varchar(100) NOT NULL COMMENT '笔记状态ID:备用',
  `cn_note_type_id` varchar(100) DEFAULT NULL COMMENT '笔记本类型ID：备用',
  `cn_note_title` varchar(500) NOT NULL COMMENT '笔记标题',
  `cn_note_body` text COMMENT '笔记内容',
  `cn_note_create_time` bigint(20) NOT NULL COMMENT '笔记创建时间',
  `cn_note_last_modify_time` bigint(20) DEFAULT NULL COMMENT '笔记最近修改时间',
  PRIMARY KEY (`cn_note_title`,`cn_notebook_id`),
  UNIQUE KEY `cn_note_title` (`cn_note_title`),
  KEY `FK_Reference_2` (`cn_notebook_id`),
  KEY `FK_Reference_3` (`cn_user_id`),
  KEY `FK_Reference_7` (`cn_note_status_id`),
  KEY `FK_Reference_8` (`cn_note_type_id`),
  CONSTRAINT `notebookId` FOREIGN KEY (`cn_notebook_id`) REFERENCES `cn_notebook` (`cn_notebook_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `cn_notebook`
-- ----------------------------
DROP TABLE IF EXISTS `cn_notebook`;
CREATE TABLE `cn_notebook` (
  `cn_notebook_id` varchar(100) NOT NULL COMMENT '笔记本ID',
  `cn_user_id` varchar(100) DEFAULT NULL COMMENT '用户ID',
  `cn_notebook_type_id` varchar(100) DEFAULT NULL COMMENT '笔记本类型ID',
  `cn_notebook_name` varchar(500) NOT NULL COMMENT '笔记本名',
  `cn_notebook_desc` text COMMENT '笔记本说明',
  `cn_notebook_createtime` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`cn_notebook_id`,`cn_notebook_name`),
  UNIQUE KEY `cn_notebook_name` (`cn_notebook_name`),
  KEY `FK_Note_User_Reference` (`cn_user_id`),
  KEY `FK_Reference_6` (`cn_notebook_type_id`),
  CONSTRAINT `user_foreign_key` FOREIGN KEY (`cn_user_id`) REFERENCES `cn_user` (`cn_user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `cn_user`
-- ----------------------------
DROP TABLE IF EXISTS `cn_user`;
CREATE TABLE `cn_user` (
  `cn_user_id` varchar(100) NOT NULL COMMENT '用户ID',
  `cn_user_name` varchar(100) NOT NULL COMMENT '用户名',
  `cn_user_password` varchar(100) DEFAULT NULL COMMENT '密码',
  `cn_user_token` varchar(100) DEFAULT NULL COMMENT '令牌',
  `cn_user_nick` text COMMENT '说明',
  PRIMARY KEY (`cn_user_id`,`cn_user_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

SET FOREIGN_KEY_CHECKS = 1;
