import { recoverMessageAddress } from "viem";
import VerifyOptions from "~~/types/verifyOptions";

export const getSignMessageForId = async (messageId: any, options: VerifyOptions) => {
  let data = {};
  switch (messageId) {
    case "ballotSubmit":
      data = {
        projects: options.projects,
      };

      return `I want to submit a ballot as ${options.address}:\n\n${JSON.stringify(data, null, 2)}`;

    case "listCreate":
      data = {
        name: options.name,
        creator: options.address,
        description: options.description,
        impactEvaluation: options.impactEvaluation,
        projects: options.projects,
      };
      return `I want to share my ballot as ${options.address}:\n\n${JSON.stringify(data, null, 2)}`;

    case "listLike":
      const list = options.list;
      const isLiked = list?.likes?.includes(options.address);
      return `${isLiked ? "Unlike" : "Like"} the list "${list.name}" as ${options.address}`;

    default:
      return "Invalid signing option";
  }
};

export const verifySignature = async (signature: any, verifyOptions: VerifyOptions) => {
  const trustedMessage = await getSignMessageForId(verifyOptions.messageId, verifyOptions);
  const signingAddress = await recoverMessageAddress({ message: trustedMessage, signature });
  return signingAddress === verifyOptions.address;
};
