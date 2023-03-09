DROP TABLE IF EXISTS customers CASCADE;

CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    emp_id VARCHAR(100) NOT NULL,
    emp_no VARCHAR(50) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    middle_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    emp_password VARCHAR(255) NOT NULL,
    is_active INTEGER DEFAULT 0,
    is_delete INTEGER DEFAULT 0,
    created_by VARCHAR(50) NOT NULL
    created_date timestamp,
    updated_by VARCHAR(50) NULL,
    updated_date timestamp,
    last_login timestamp,
    password_changed_date timestamp,
    role_id integer NOT NULL
);

CREATE TABLE lookup_roles (
    id SERIAL PRIMARY KEY,
    lr_id VARCHAR(100) NOT NULL,
    role_id INTEGER NOT NULL,
    role_name VARCHAR(100) NOT NULL
);

CREATE TABLE lookup_pages (
    id SERIAL PRIMARY KEY,
    lp_id VARCHAR(100) NOT NULL,
    page_id INTEGER NOT NULL,
    menu VARCHAR(100) NOT NULL,
    page_name VARCHAR(100) NOT NULL
);

CREATE TABLE role_pages_mapping (
    id SERIAL PRIMARY KEY,
    rpm_id VARCHAR(100) NOT NULL,
    role_id INTEGER NOT NULL,
    page_id INTEGER NOT NULL,
);

CREATE TABLE companies (
    id SERIAL PRIMARY KEY,
    com_id VARCHAR(100) NOT NULL,
    com_no VARCHAR(100) NOT NULL,
    com_name VARCHAR(100) NOT NULL,
    is_delete INTEGER DEFAULT 0,
    created_by VARCHAR(100) NOT NULL,
    created_date timestamp,
    updated_by VARCHAR(100) NULL,
    updated_date timestamp
);

CREATE TABLE company_branches (
    id SERIAL PRIMARY KEY,
    cb_id VARCHAR(100) NOT NULL,
    com_id INTEGER NOT NULL,
    com_branch_name VARCHAR(100) NOT NULL,
    cb_address text NOT NULL,
    phone_no INTEGER NOT NULL,
    primary_contact_name VARCHAR(100) NOT NULL,
    primary_contact_phone_no INTEGER NOT NULL,
    primary_contact_email VARCHAR(100) NOT NULL,
    lat VARCHAR(100) NOT NULL,
    long VARCHAR(100) NOT NULL,
    is_delete INTEGER DEFAULT 0,
    created_by VARCHAR(100) NOT NULL,
    created_date timestamp,
    updated_by VARCHAR(100) NULL,
    updated_date timestamp
);

CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    proj_id VARCHAR(100) NOT NULL, 
    proj_name VARCHAR(100) NOT NULL,
    cb_id INTEGER NOT NULL,
    com_id INTEGER NOT NULL,
    is_delete INTEGER DEFAULT 0,
    created_by VARCHAR(100) NOT NULL,
    created_date timestamp,
    updated_by VARCHAR(100) NULL,
    updated_date timestamp
);

CREATE TABLE project_units (
    id SERIAL PRIMARY KEY,
    pu_id VARCHAR(100) NOT NULL, 
    proj_id VARCHAR(100) NOT NULL, 
    unit_name VARCHAR(100) NOT NULL,
    cb_id INTEGER NOT NULL,
    com_id INTEGER NOT NULL,
    is_delete INTEGER DEFAULT 0,
    created_by VARCHAR(100) NOT NULL,
    created_date timestamp,
    updated_by VARCHAR(100) NULL,
    updated_date timestamp
);

CREATE TABLE lookup_unit_conversion (
    id SERIAL PRIMARY KEY,
    luc_id VARCHAR(100) NOT NULL,
    unit VARCHAR(100) NOT NULL
);

CREATE TABLE lookup_quotation_status (
    id SERIAL PRIMARY KEY,
    qs_id VARCHAR(100) NOT NULL,
    qs_name VARCHAR(100) NOT NULL
);

CREATE TABLE lookup_fans (
    id SERIAL PRIMARY KEY,
    lf_id VARCHAR(100) NOT NULL,
    fan_id INTEGER NOT NULL,
    fan_name VARCHAR(100) NOT NULL,
    fan_diameter VARCHAR(100) NOT NULL
);


