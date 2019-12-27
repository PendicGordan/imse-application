# Reservation Management System
Application stack:
	1. Frontend - VueJS;
	2. Backend - NodeJS - Express REST Api;
	3. Relational Database - MySQL with Sequelize as Object Relational Mapping (ORM) library;
	4. Non-relational Database - MongoDB (relevant for MS3);
	5. Docker as deployment tool.

2.1 Infrastructure
- IS container composition, isolation and deployment => DONE
- HTTPS => NOT DONE

2.2 Logical/Physical Database Design => DONE
2.3 Data import => DONE
2.4 Implementation Web system (relational DBMS)
	- Main Business Use-Case - DONE
	- Elaborate Reporting Use-Case - DONE
	- Additional Use-Cases(2 Person Group): Inserting employee, analysing the employee data, resetting the user password, login user into the account - DONE

Opening http://localhost:8080 the login page should be opened. Login Data is already shown on the screen. Please choose one. 
User will be redirected to the page for creating a new reservation. When the reservation is created, it will be visible in Reporting -> Reservations tab. 
Certain Data Management/Analysis can be done here. In New Employee tab, a new Employee can be created. In reporting -> Employees certain Employee Management/Analysis can be done. In Profile tab, user can see its email and eventually change the current password.

!!! IMPORTANT: 'docker-compose up --build should be done twice because of problem when downloading database image (mysql)' !!!

Architecture NOTE: frontend code is deployed on nginx container, which should serve as Reverse Proxy. This container will be opened on port 8080, where frontend
is accessible on localhost:8080/ and backend on localhost:8080/api, like defined in /etc/nginx/conf.d/default.conf. Access from outside to mysql and mongo containers
is disabled. Backend runs in separate container and therefore has its own Dockerfile.  Therefore it must be connected to the same network as frontend/nginx, 
which is defined in docker-compose.yml. It's also exposing the port 3000, which is the port on which backend application is running. Frontend code is not running as application on specific port, but it's built during docker compose phase and this built bundle is put into the /usr/share/nginx/html folder on nginx container.

Pendic Gordan, 01607955
Micic Dejan, 01549172
