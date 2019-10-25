INSERT INTO blueberry_site VALUES
(1,60604,'chicago','IL'),
(2,07080,'south plainfield','NJ'),
(3,30318,'atlanta','GA'),
(4,20876,'germantown','MD'),
(5,94538,'fremont','CA'),
(6,18940,'newtown','PA'),
(7,64117,'north kansas city','MO'),
(8,08902,'north brunswick','NJ'),
(9,03062,'nashua','NH'),
(10,02210,'boston','MA'),
(11,15106,'carnegie','PA'),
(12,33487,'boca raton','FL'),
(13,01803,'burlington','MA'),
(14,94025,'menlo park','CA'),
(15,94103,'san francisco','CA');

INSERT INTO blueberry_employer VALUES
(1,'alphabit trading, llc','trading'),
(2,'aries computer systems, inc.','recruiting'),
(3,'brandmovers, inc','marketing'),
(4,'branta group llc','information technology'),
(5,'bridgenexus technologies inc','consulting'),
(6,'caspex corp','consulting'),
(7,'cerner corporation','information technology'),
(8,'dataquest corp','recruiting'),
(9,'dataserv inc','software'),
(10,'dataxu, inc.','marketing'),
(11,'esource technology, llc','information technology'),
(12,'eta phi systems, inc.','transportation'),
(13,'everbridge, inc.','communications'),
(14,'facebook, inc.','software'),
(15,'homeaway.com, inc.','travel'),
(16,'htc global services inc','information technology'),
(17,'innova solutions, inc.','software'),
(18,'intraedge, inc.','consulting'),
(19,'ithoppers inc','information technology'),
(20,'jvr systems, inc.','consulting'),
(21,'lyft, inc.','software'),
(22,'microsoft corporation','software'),
(23,'mphasis corporation','information technology'),
(24,'multivision llc','consulting'),
(25,'nebula partners llc.','consulting'),
(26,'palo alto networks, inc.','software'),
(27,'pantar solutions inc','software'),
(28,'peer street, inc.','investments'),
(29,'people tech group inc.','consulting'),
(30,'phunware, inc.','software'),
(31,'pinterest, inc.','software'),
(32,'prowise solutions inc','recruiting'),
(33,'quest global services-na, inc.','product engineering'),
(34,'riot games, inc.','software'),
(35,'salesforce.com, inc.','software'),
(36,'scopely, inc.','software'),
(37,'smart works, llc','recruiting'),
(38,'stackit professionals inc','recruiting'),
(39,'stripe, inc.','software'),
(40,'synapsis inc','information technology'),
(41,'tech mahindra (americas),inc.','information technology'),
(42,'tek it,inc','consulting'),
(43,'the mathworks, inc.','software'),
(44,'uber technologies, inc.','software');

-- INSERT INTO RegisteredUser VALUES
-- (1, 'John Doe', 'password', 'john@doe.com'),
-- (2, 'Apu Nahasapeemapetilon', 'password', 'apu@yahoo.com'),
-- (3, 'Crazy Vaclav', 'password', 'vaclav@hotmail.com');

-- INSERT INTO Admin VALUES
-- (1);

INSERT INTO blueberry_wageposting VALUES
(1,'software engineer',72426,2009,1,1,1),
(2,'software engineer',91395,2010,2,2,1),
(3,'software engineer',60528,2011,3,3,1),
(4,'software engineer',109325,2012,4,4,1),
(5,'software engineer',87859,2013,5,5,1),
(6,'software engineer',87235,2014,6,6,1),
(7,'software engineer',63923,2015,7,7,1),
(8,'software engineer',110864,2009,8,8,2),
(9,'software engineer',92331,2010,9,9,2),
(10,'software engineer',75130,2011,10,10,2),
(11,'software engineer',87818,2012,11,11,2),
(12,'software engineer',83366,2013,12,12,2),
(13,'software engineer',113256,2014,13,13,2),
(14,'software engineer',129220,2015,14,14,2),
(15,'software engineer',138831,2016,14,14,2);

INSERT INTO blueberry_wagebuffer VALUES
(1,'software engineer',112549,2015,15,44,3),
(2,'software engineer',84302,2016,15,44,3),
(3,'software engineer',112549,2017,15,44,3);

-- CREATE TABLE IF NOT EXISTS "blueberry_wageposting" (
-- 	"postingid" integer NOT NULL PRIMARY KEY AUTOINCREMENT, 
-- 	"position" varchar(256) NOT NULL, 
-- 	"wage" integer NOT NULL, 
-- 	year" integer NOT NULL, 
-- 	"employerid_id" integer NOT NULL REFERENCES "blueberry_employer" ("employerid") DEFERRABLE INITIALLY DEFERRED, 
-- 	"siteid_id" integer NOT NULL REFERENCES "blueberry_site" ("siteid") DEFERRABLE INITIALLY DEFERRED, 
-- 	"uid_id" integer NOT NULL REFERENCES "auth_user" ("id") DEFERRABLE INITIALLY DEFERRED);

INSERT INTO blueberry_housingposting  VALUES
(1,3698000,2014,2,14),
(2,1998000,2015,2,14),
(3,2099999,2016,2,14);

INSERT INTO blueberry_housingbuffer VALUES
(1,3349000,2014,1,15),
(2,1898000,2015,1,15),
(3,2495000,2016,1,15);

-- CREATE TABLE IF NOT EXISTS "blueberry_housingposting" (
-- 	"postingid" integer NOT NULL PRIMARY KEY AUTOINCREMENT, 
-- 	"price" integer NOT NULL, 
-- 	"year" integer NOT NULL, 
-- 	"uid_id" integer NOT NULL REFERENCES "auth_user" ("id") DEFERRABLE INITIALLY DEFERRED, 
-- 	"siteid_id" integer NOT NULL REFERENCES "blueberry_site" ("siteid") DEFERRABLE INITIALLY DEFERRED);
