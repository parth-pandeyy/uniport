export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export enum AccessRoleEnum {
  Admin = 'ADMIN',
  Student = 'STUDENT'
}

export type AddStudentProfileDefinitionsInput = {
  attribute_type: Scalars['String'];
  is_array: Scalars['Boolean'];
  label: Scalars['String'];
  required: Scalars['Boolean'];
  options: Array<Maybe<Scalars['String']>>;
  requires_proof: Scalars['Boolean'];
};

export type Campaign = {
  __typename?: 'Campaign';
  campaign_id: Scalars['ID'];
  campaign_name: Scalars['String'];
};

export type CampaignDetails = {
  __typename?: 'CampaignDetails';
  campaign_id: Scalars['ID'];
  campaign_name: Scalars['String'];
  rules: Array<Maybe<FilteringRule>>;
};

export type FilteringRule = {
  __typename?: 'FilteringRule';
  attribute_id: Scalars['String'];
  operator: Scalars['String'];
  threshold_value: Scalars['Int'];
  prefix_multiplier: Scalars['Int'];
  multi_select_threshold: Array<Maybe<Scalars['String']>>;
};

export type InviteNewUsersToCampaignInput = {
  user_emails: Array<Scalars['String']>;
  access_role: AccessRoleEnum;
  campaign_id: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  registerAdmin: User;
  loginExistingUser: User;
  registerWithValidInvite: User;
  addStudentProfileDefinitions: Scalars['Boolean'];
  createANewCampaign: Campaign;
  inviteNewUsersToCampaign: Scalars['Boolean'];
};


export type MutationRegisterAdminArgs = {
  payload: RegisterAdminInput;
};


export type MutationLoginExistingUserArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRegisterWithValidInviteArgs = {
  payload?: Maybe<RegisterWithValidInviteInput>;
};


export type MutationAddStudentProfileDefinitionsArgs = {
  payload: Array<AddStudentProfileDefinitionsInput>;
};


export type MutationCreateANewCampaignArgs = {
  campaign_name: Scalars['String'];
};


export type MutationInviteNewUsersToCampaignArgs = {
  payload?: Maybe<InviteNewUsersToCampaignInput>;
};

export type NavItem = {
  __typename?: 'NavItem';
  label: Scalars['String'];
  relative_url: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getUserDetails?: Maybe<User>;
  checkAuthStatus: Scalars['String'];
  getNavItems: Array<Maybe<NavItem>>;
  getStudentProfileDefinitions: Array<Maybe<StudentProfileDefinition>>;
  getMyCampaigns: Array<Maybe<Campaign>>;
  getCampaignDetailsById: CampaignDetails;
};


export type QueryGetCampaignDetailsByIdArgs = {
  campaign_id: Scalars['String'];
};

export type RegisterAdminInput = {
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  email_address: Scalars['String'];
  password: Scalars['String'];
  org_name: Scalars['String'];
};

export type RegisterWithValidInviteInput = {
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  email_address: Scalars['String'];
  password: Scalars['String'];
};

export type StudentProfileDefinition = {
  __typename?: 'StudentProfileDefinition';
  org_id: Scalars['String'];
  attribute_id: Scalars['ID'];
  attribute_type: Scalars['String'];
  is_array: Scalars['Boolean'];
  label: Scalars['String'];
  is_blocked: Scalars['Boolean'];
  required: Scalars['Boolean'];
  options: Array<Maybe<Scalars['String']>>;
  requires_proof: Scalars['Boolean'];
};

export type User = {
  __typename?: 'User';
  user_id: Scalars['ID'];
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  email_address: Scalars['String'];
  org_id: Scalars['String'];
  access_role: Scalars['String'];
  has_student_profile: Scalars['Boolean'];
};
