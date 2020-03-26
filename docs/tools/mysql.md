# MySQL入门
## 创建
```sql
-- 创建数据库
create database school default charset utf8mb4;
-- 切换数据库
use school;
-- 显示数据库下的表
show tables;

-- 删除数据库
drop database if exists school;
-- 创建学生表
create table tb_student(
  stuid int not null comment '学号',
  stuname varchar(20) not null comment '姓名',
  stusex bit default 1 comment '性别', 
  stubirth date comment '生日',
  primary key(stuid)
)

-- 修改学生表
-- 添加列
alter table tb_student add column stuaddr varchar(255);
-- 修改列
alter table tb_student change column stuaddr stuaddr varchar(511);
-- 删除列
alter table tb_student drop column stuaddr;

-- 向学生表插入数据
insert into tb_student values (1001, '张三丰', 1, '1982-2-2', '湖北十堰');
insert into tb_student values (1002, '张三丰', 1, '1982-2-2', '湖北十堰');
insert into tb_student (stuid, stuname) values (1003, '张翠山');
insert into tb_student (stusex, stuid, stuname) values (0, 1004, '殷素素');
-- 一次性插入多条数据
insert into tb_student (stuid, stuname, stusex) values 
(1005, '杨逍', default),
(1006, '谢逊', 1),
(1007, '杨不悔', 0);
insert into tb_student values 
(1008, '周芷若', 0, '1992-4-15', '湖南长沙'),
(1009, '范瑶', 1, '1990-3-20', '湖北武汉');

-- 截断表（删除全表）
-- truncate table tb_student

-- 删除学生
delete from tb_student where stuid=1002;
-- 删除所有女学生
-- delete from tb_student where stusex=0;

-- 更新操作
update tb_student set stuaddr='四川成都' where stuid in (1005, 1006);
update tb_student set stubirth='1998-12-30', stuaddr='山西大同' where stuid=1007;

-- 创建学院表
create table tb_college(
  colid int auto_increment comment '编号',
  colname varchar(31) not null comment '名称',
  website varchar(1023) comment '网址',
  primary key (colid)
);

-- 插入学院记录
insert into tb_college (colname) values 
('计算机学院'),
('外国语学院'),
('经济管理学院');

alter table tb_student add column colid int;
-- 修改学生表添加外键约束（参照完整性）
alter table tb_student add constraint fk_student_colid foreign key (colid) references tb_college (colid)
update tb_student set colid=1 where stuid between 1001 and 1006;
update tb_student set colid=2 where stuid in (1007, 1008);
update tb_student set colid=3 where stuid=1009;
```

## 查询
```sql
-- 查询所有学生
select * from tb_student;
-- 查询所有课程名称及学分
select couname, coucaredit from tb_course;
select couname as 课程名称, coucaredit as 学分 from tb_course;
select stuname as 姓名, case stusex when 1 then '男' else '女' end as 性别 from tb_student;
select stuname as 姓名, if (stusex, '男', '女') as 性别 from tb_student;
-- 查询所有女学生姓名和出生日期（筛选）
select stuname, stubirth from tb_student where stusex=0;
-- 查询所有80后学生的姓名、性别和出生日期（筛选）
select stuname, stusex, stubirth from tb_student where stubirth>='1980-1-1' and stubirth<='1989-12-31'
select stuname, stusex, stubirth from tb_student where stubirth between '1980-1-1' and '1989-12-31'
-- 查询姓‘林’的学生姓名和性别（模糊）
select stuname, stusex from tb_student where stuname like '林%';
-- 查询姓‘杨’名字两个字的学生姓名和性别（模糊）
select stuname, stusex from tb_student where stuname like '杨_';
-- 查询姓‘杨’名字三个字的学生姓名和性别（模糊）
select stuname, stusex from tb_student where stuname like '杨__';
-- 查询名字中有‘不’字或‘嫣’字的学生的姓名（模糊）
select stuname, stusex from tb_student where stuname like '%不%' or stuname like '%嫣';
-- 查询没有录入家庭住址的学生姓名（空值）
select stuname from tb_student where stuaddr is null;
-- 查询录入家庭住址的学生姓名（空值）
select stuname from tb_student where stuaddr is not null;
-- 查询学生选课的所有日期（去重）
select distinct scdate from tb_score
-- 查询学生的家庭住址（去重）
select distinct stuaddr from tb_student where stuaddr is not null;
-- 查询男学生的姓名和生日按年龄从大到小排序（排序）
-- asc - ascending - 升序（从小到大）
-- desc - descending - 降序（从大到小）
select stuname, stubirth from tb_student where stusex=1 order by stubirth desc;
select stuname, year(now()) - year(stubirth) as 年龄  from tb_student where stusex=1 order by 年龄 desc;
-- 聚合函数：max / min / count / sum / avg
-- 查询年龄最大的学生出生日期（聚合函数）
select min(stubirth) from tb_student;
-- 查询年龄最小的学生出生日期（聚合函数）
select max(stubirth) from tb_student;
-- 查询男女学生的人数（分组和聚合函数）
select count(stuid) from tb_student;
select stusex, count(stuid) from tb_student group by stusex;
-- 查询男女生年龄最大（分组和聚合函数）
select stusex, min(stubirth), stuname from tb_student group by stusex;
-- 查询课程编号为1111的课程的平均成绩（筛选和聚合函数）
select avg(scmark) from tb_score where couid=1111;
select min(scmark) from tb_score where couid=1111;
select min(scid) from tb_score where couid=1111;
-- 查询学号为1001的学生所有课程的平均分（筛选和聚合函数）
select avg(scmark) from tb_score where stuid=1001;
-- 查询每个学生的学号和平均成句（分组和聚合函数）
select stuid as 学号, avg(scmark) as 平均分 from tb_score group by stuid;
-- 查询平均成绩大于等于90分的学生的学号和平均成绩
-- 分组以前的筛选使用where子句
-- 分组以前的筛选使用having子句
select stuid as 学号, avg(scmark) as 平均分 from tb_score group by stuid having 平均分>=90;
-- 查询年龄最大的学生的姓名（子查询）
select stuname from tb_student where stubirth=(
  select min(stubirth) from tb_student
);
-- 查询年龄最大的学生姓名和年龄（子查询+运算）
select stuname as 姓名, year(now())-year(stubirth) as 年龄 from tb_student where stubirth=(
  select min(stubirth) from tb_student
);
-- 查询选了两门以上的课程的学生姓名（子查询/分组条件/集合运算）
select styname from tb_student where stuid in(
  select stuid from tb_score group by stuid having count(stuid)>2
);
-- 查询学生姓名、课程姓名以及考试成绩（连接查询）
-- 笛卡尔积
select stuname, counamem, scmark from tb_student t1, tb_course t2, tb_score t3 where t1.stuid=t3.stuid and t2.couid=t3.couid and scmark is not null;
-- 内连接（inner join）
select stuname, counamem, scmark from tb_student t1 inner join tb_score t3 on t1.stuid=t3.stuid inner join tb_course t2 on t2.couid=t3.couid where scmark is not null order by scmark desc limit 5 offset 10;

-- 查询选课学生的姓名和平均成绩（子查询和连接查询）
select stuname, avgmark from tb_student t1,
(select stuid, avg(scmark) as avgmark from tb_score group by stuid) t2 where t1.stuid=t2.stuid;
select stuname, avgmark from tb_student t1 inner join
(select stuid, avg(scmark) as avgmark from tb_score group by stuid) t2 on t1.stuid=t2.stuid;

-- 外连接（outer join）: 左外连接 / 右外连接 / 全外连接
-- 查询每个学生的姓名和选课数量（左外连接和子查询）
select stuname, ifnull(total, 0) from tb_student t1 left outer join 
(select stuid, count(stuid) as total from tb_score  group by stuid) t2 on t1.stuid=t2.stuid;
```