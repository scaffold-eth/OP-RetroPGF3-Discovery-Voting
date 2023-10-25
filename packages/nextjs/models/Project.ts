import mongoose, { Document, Schema } from "mongoose";

interface ContributionLink {
  type: string;
  url: string;
  description: string;
}

interface ImpactMetrics {
  description: string;
  number: number;
  url: string;
}

interface FundingSource {
  type: string;
  currency: string;
  amount: number;
  description: string;
}

export interface IProject {
  _id: string; // You can use string as the type for _id
  name: string;
  url: string;
  profileImageUrl: string;
  bannerImageUrl: string;
  websiteUrl: string;
  bio: string;
  applicantType: string;
  contributionDescription: string;
  contributionLinks: ContributionLink[];
  impactCategory: string[];
  impactDescription: string;
  impactMetrics: ImpactMetrics[];
  fundingSources: FundingSource[];
  payoutAddress: string;
  understoodKYCRequirements: boolean;
  understoodFundClaimPeriod: boolean;
  certifiedNotDesignatedOrSanctionedOrBlocked: boolean;
  certifiedNotSponsoredByPoliticalFigureOrGovernmentEntity: boolean;
  certifiedNotBarredFromParticipating: boolean;
  ownerName: string;
}

export type ProjectDocument = IProject & Document;

export const projectSchema = new Schema<ProjectDocument>({
  _id: String,
  name: String,
  url: String,
  profileImageUrl: String,
  bannerImageUrl: String,
  websiteUrl: String,
  bio: String,
  applicantType: String,
  contributionDescription: String,
  contributionLinks: [
    {
      type: String,
      url: String,
      description: String,
    },
  ],
  impactCategory: [String],
  impactDescription: String,
  impactMetrics: [
    {
      description: String,
      number: Number,
      url: String,
    },
  ],
  fundingSources: [
    {
      type: String,
      currency: String,
      amount: Number,
      description: String,
    },
  ],
  payoutAddress: String,
  understoodKYCRequirements: Boolean,
  understoodFundClaimPeriod: Boolean,
  certifiedNotDesignatedOrSanctionedOrBlocked: Boolean,
  certifiedNotSponsoredByPoliticalFigureOrGovernmentEntity: Boolean,
  certifiedNotBarredFromParticipating: Boolean,
  ownerName: String,
});

const Project = mongoose.models.Projects || mongoose.model("Projects", projectSchema);

export default Project;
