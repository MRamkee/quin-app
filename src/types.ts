// © Copyright 2022 Ramkee-Mukuru Quin-App

import { AxiosResponse } from "axios";

export type TranslationFunction = (key: string, opts?: any) => string;

export enum CustomDestinationTypes {
  Auto = "Auto",
  SameAsSource = "Same as source"
}

export enum AppType {
  AWS = "AWS",
  VMWARE = "VMWARE"
}

export enum MaxFrequency {
  HOUR = 24,
  DAY = 7,
  WEEK = 4,
  YEAR_CLOUD = 3,
  VMWARE_SNAPSHOT_DAY = 2,
  AWS_SNPASHOT_DAY = 7,
  AWS_SNAPSHOT_MONTH = 6,
  AWS_CLOUD_YEARS = 7,
  MONTH = 12
}

export enum PolicyAction {
  NEW = "new",
  EDIT = "edit",
  CLONE = "clone",
  ASSIGN_TO_PG = "assign-to-protection-group",
  SELECT_PG_SERVICE = "select-protection-group-service",
  PROTECT = "protect"
}

export const TRANSLATION_NS: string = "policy";
export const MAX_POLICY_NAME_LIMIT = 255;
export const MAX_DIRECT_CLOUD_SCHEDULES = 1;

export const POLICIES_URL = "/protection-policies";
export const STORAGE_POOL_URL =
  "/onprem-setup/protection-store-gateways/wizard";
export const SELECT_PG_SERVICE_URL = `${POLICIES_URL}?operation=${PolicyAction.SELECT_PG_SERVICE}`;
export const AWS_PG_URL = "/aws/protection-groups";
export const AWS_CREATE_PG_URL = `${AWS_PG_URL}?operation=${PolicyAction.NEW}`;
export const VMWARE_PG_URL = "/vmware/protection-groups";
export const VMWARE_CREATE_PG_URL = `${VMWARE_PG_URL}?operation=${PolicyAction.NEW}`;

export const UNSUPPORTED_IMMUTABILITY = "AWS_SNAPSHOT";

export enum CopyType {
  SNAPSHOT = "SNAPSHOT",
  LOCAL_BACKUP = "LOCAL_BACKUP",
  CLOUD_BACKUP = "CLOUD_BACKUP",
  REPLICATED_SNAPSHOT = "REPLICATED_SNAPSHOT"
}

export enum ApiCopyType {
  SNAPSHOT = "SNAPSHOT",
  LOCAL_BACKUP = "BACKUP",
  CLOUD_BACKUP = "CLOUD_BACKUP",
  REPLICATED_SNAPSHOT = "REPLICATED_SNAPSHOT"
}

export enum ApiCopyOldType {
  SNAPSHOT = "Snapshot",
  LOCAL_BACKUP = "Backup",
  CLOUD_BACKUP = "CloudBackup"
}

export enum ApiCopyPoolType {
  LOCAL_BACKUP = "ON_PREMISES",
  CLOUD_BACKUP = "CLOUD"
}

export enum Frequency {
  HOURS = "Hour",
  DAYS = "Day",
  WEEKS = "Week",
  MONTHS = "Month",
  YEARS = "Year"
}

export enum FrequencyLabel {
  HOURLY = "Hourly",
  DAILY = "Daily",
  WEEKLY = "Weekly",
  MONTHLY = "Monthly",
  YEARLY = "Yearly",
  BY_MINUTES = "By Minutes"
}

export enum ApiFrequency {
  HOURS = "HOURS",
  DAYS = "DAYS",
  WEEKS = "WEEKS",
  MONTHS = "MONTHS",
  YEARS = "YEARS"
}

export enum ApiRecurrenceType {
  HOURLY = "HOURLY",
  DAILY = "DAILY",
  WEEKLY = "WEEKLY",
  MONTHLY = "MONTHLY",
  YEARLY = "YEARLY",
  BY_MINUTES = "BY_MINUTES"
}

export enum NameFormat {
  SOURCE_ASSET_NAME = "SourceAssetName",
  NUMBER_INCREMENT = "NumberIncrement",
  DATE_FORMAT = "DateFormat"
}

export enum StartEndTimes {
  START = "00:00",
  BACKUP = "23:00",
  END = "23:59"
}

export enum IAssetType {
  VIRTUAL_MACHINE = "Virtual Machine",
  DATASTORE = "Datastore",
  VM_PROTECTION_GROUP = "Protection Group",
  MSSQLInstance = "MS SQL Instance",
  KubernetesApplication = "Kubernetes Application",
  CSP_VOLUME = "EBS Volume",
  CSP_MACHINE_INSTANCE = "EC2 Instance",
  CSP_PROTECTION_GROUP = "AWS Protection Group",
  CSPMachineInstance = "EC2",
  CSPProtectionGroup = "AWS Protection Group",
  CSPVolume = "EBS"
}

export enum BackupCopies {
  basic = "1",
  basicPlus = "2",
  platinum = "3",
  cbtBasicPlus = "1",
  cbtPlatinum = "2"
}

export type ProtectionID = string | null | undefined;

export interface IList {
  label: string;
  value: string;
}

export interface IPolicyContainerContext {
  actions: { [key: string]: (...arg: any) => void };
  state: { [key: string]: any };
  api: { [key: string]: (...arg: any) => Promise<AxiosResponse<any>> };
  translations: { t: any };
}

export interface IPolicyScheduleActiveTime {
  activeFromTime?: string;
  activeUntilTime?: string;
}

export interface IPolicyScheduleRepeatInterval {
  on?: number[];
  every: number;
}

export interface IPolicyScheduleTime {
  startTime?: string;
  activeTime?: IPolicyScheduleActiveTime;
  recurrence?: ApiRecurrenceType;
  repeatInterval?: IPolicyScheduleRepeatInterval;
  startDate?: string;
}

export interface IPolicyLockFor {
  unit?: ApiFrequency;
  value?: number;
}

export type IPolicyExpireAfter = IPolicyLockFor;

export interface INamePattern {
  format: string;
}

export interface IPolicySchedules {
  sourceProtectionScheduleId?: number;
  id: number;
  name: string;
  schedule: IPolicyScheduleTime;
  expireAfter?: IPolicyExpireAfter;
  lockFor?: IPolicyLockFor;
  namePattern?: INamePattern;
  verificationInfo?: { mssql: { targetInstance: string } };
  verify?: boolean;
  protectionStoreGateways?: string;
}

export interface IPolicyProtection {
  id?: string;
  type?: string;
  schedules: IPolicySchedules[];
  protectionStoreId?: string;
  protectionStoreInfo?: ICopyPoolInfo;
  applicationType?: AppType;
}

export interface IAssetInfo {
  displayName?: string;
  id: string;
  name: string;
  type: string;
  applicationType?: AppType;
}

export interface IProtectionJobsInfo {
  id: string;
  assetInfo: IAssetInfo;
}

export interface IPolicyModelItem {
  id: string;
  name: string;
  appType?: string;
  assigned: boolean;
  description: string;
  protectionJobsInfo: IProtectionJobsInfo[];
  protections: IPolicyProtection[];
}

export interface IPolicyModel {
  items: IPolicyModelItem[];
  pageLimit: number;
  pageOffset: number;
}

export interface IPolicyApiPayload {
  id?: string;
  name: string;
  description?: string;
  protections: IPolicyProtection[];
}

export interface IPolicyDetailedModelItem extends IPolicyModelItem {
  createdAt: string;
  createdBy: { id: string; name: string };
  generation: number;
  resourceUri: string;
  policyType: string;
  updatedAt: string;
  type: string;
}

export interface IPolicyDescription extends IList {}

export interface IPolicySummary {
  copyName: string;
  frequency: string;
  backupEvery: string;
  backupEveryLabel: string;
  retainFor: string;
  retainForLabel: string;
  destination: string;
  destinationLabel: string;
  immutable?: string;
  protectionStoreGateways: string;
  protectionStoreGatewaysLabel: string;
}

export interface IPolicyDetailsSummary {
  name: string;
  schedules: IList[][];
}

export interface IPolicyUsedBy {
  key: string;
  value: number;
}

export interface IPolicyModelListView {
  id: string;
  name: string;
  usedBy: IPolicyUsedBy[];
  usedByCount: number;
  redirectUrl: string;
  description?: IPolicyDescription[];
  summary: IPolicySummary[];
}

export interface IPolicyModelDetailsView {
  id: string;
  name: string;
  assigned: boolean;
  usedByCount: number;
  usage: IAssetInfo[];
  summary: IPolicyDetailsSummary[];
}

export type StorageSystemType = "PROTECTION_STORE_GATEWAY" | "STOREONCE";

interface IStorageSystem {
  id: string;
  name: string;
  type: StorageSystemType;
}

export interface IStorageSystemInfo {
  id: string;
  name: string;
  type: string;
}

export interface ICopyPool {
  protectionStoreType: ApiCopyPoolType;
  id: string;
  name: string;
  displayName?: string;
  region?: string;
  storageSystemInfo: IStorageSystem;
}

export interface ICopyPoolInfo {
  id: string;
  name: string;
  displayName?: string;
  type: ApiCopyPoolType;
  region?: string;
  storageSystemInfo?: IStorageSystemInfo;
}

export type ICreateCloudPoolPayload =
  | ICreateCloudPoolPayloadForPSG
  | ICreateCloudPoolPayloadForSO;

export interface ICreateCloudPoolPayloadForPSG {
  protectionStoreGatewayId: string;
  poolName?: string;
  region: string;
}

export interface ICreateCloudPoolPayloadForSO {
  storeOnceId: string;
  poolName?: string;
  region: string;
}

export interface IPolicyScheduleForm {
  id: number;
  type?: string;
  protectionId: string;
  immutable: boolean;
  frequency: number;
  frequencyUnit: { label: Frequency; value: Frequency };
  retention: number;
  retentionUnit: { label: Frequency; value: Frequency };
  sourceProtectionScheduleId?: number;
  activeFromTime?: string;
  activeUntilTime?: string;
  startTime?: string;
  startDay?: { label: string; value: number };
  startDate?: { label: string; value: number };
  startMonth?: { label: string; value: number };
  destination?: string;
  protectionStoreInfo?: ICopyPoolInfo;
  applicationType?: AppType;
  protectionStoreGateways?: string | undefined;
}

export interface IOption {
  label: string;
  value: Frequency;
  disabled?: boolean;
}

export interface IPolicyCopyForm {
  schedules: IPolicyScheduleForm[];
}

export interface IWeeks {
  label: string;
  value: number;
}

export type IMonths = IWeeks;
export type IDates = IWeeks;

export interface ICopyAccordionType {
  type: CopyType;
  maxSchedules: number;
  poolSelection?: boolean;
  regionSelection?: boolean;
}

export interface IPolicyProtectionForm {
  type: string;
  applicationType?: AppType;
  schedules: IPolicyScheduleForm[];
}

export interface ICopyOption {
  name: string;
  type: CopyType;
  maxSchedules: number;
  parentCopies?: CopyType[];
  dependencies?: CopyType[];
  poolSelection?: boolean;
  regionSelection?: boolean;
  invalid?: boolean;
  applicationType: AppType;
}

export interface IAllCopyOptions {
  aws?: ICopyOption[];
  vmware?: ICopyOption[];
}

export interface IPolicyBuilderWizardValues {
  action: PolicyAction;
  policy: IPolicyDetailedModelItem;
  policyName: string;
  policies: IPolicyModelItem[];
  pools: ICopyPool[];
  isFormEditable: boolean;
  vmwareCopies: ICopyOption[];
  awsCopies?: ICopyOption[];
  protections: IPolicyProtectionForm[];
  applicationType: AppType[];
  protectionStoreGateways?: INameId[];
}

export interface IPolicyBuilderStep1FormValues {
  policy?: IPolicyDetailedModelItem;
  policyName?: string;
  protections: IPolicyProtectionForm[];
  isFormEditable: boolean;
  applicationType?: AppType[];
}

export interface IPolicyBuilderStep2FormValues {
  protections: IPolicyProtectionForm[];
  isFormEditable: boolean;
}

export interface IPolicyBuilderStep3FormValues
  extends IPolicyBuilderWizardValues {}

export interface IDefaultProtections {
  id: string;
  type: ApiCopyType;
  applicationType: AppType;
  schedules?: [];
}

export interface IDefaultPolicy {
  name: string;
  assigned: boolean;
  protections: IDefaultProtections[];
}

export interface INameId {
  name: string;
  id: string;
}
