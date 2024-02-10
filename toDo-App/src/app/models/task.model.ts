export interface Tasks {
    id: number;
    title: string;
    priority: Priority;
    status: Status;
  }

  export enum Status{
    COMPLETED,
    INPROGRESS,
    PENDING,
  }


  export enum Priority{
    HIGH,
    MEDIUM,
    LOW
  }

  export interface createTask{
    id: number;
    title: string;
    priority: Priority;
    status: Status;
    description:string;
    dueDate:Date;
    creationDate:Date;
  }
  
  export interface registerUser{
    id:number;
    firstname:string;
    lastname:string;
    email:string;
    password:string;
  }
  export interface authenticationRequest{
    email:string;
    password:string;
  }

  export interface AuthenticationResponse {
    token: string;
  }
 
  export interface SearchCriteria {
    keyType: 'STRING' | 'OBJECT';
    objType: 'FREE'|'TITLE' | 'RSTATUS' | 'PRIORITY'  ;
    val: string;
  }