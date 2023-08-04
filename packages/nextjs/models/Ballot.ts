import { prop,getModelForClass } from "@typegoose/typegoose";

class Ballot {
  @prop()
  public name?: string;

  @prop()
  public createdBy?: string;

  @prop()
  public about?: string; 

  @prop()
  public impactEvaluation?: string;

  @prop()
  public  flaggedBy?: string[];

  @prop({default:false})
  public isFlagged?: boolean;
  
  @prop()
  public slug?: string;
}

export const ProjectModel  = getModelForClass(Ballot)