// import {
//   generateRegistrationOptions,
//   verifyRegistrationResponse,
//   generateAuthenticationOptions,
//   verifyAuthenticationResponse,
// } from "@simplewebauthn/server";

// import type {
//   VerifiedRegistrationResponse,
//   VerifiedAuthenticationResponse,
// } from "@simplewebauthn/server";

// import type {
//   RegistrationResponseJSON,
//   AuthenticationResponseJSON,
//   WebAuthnCredential,
//   AuthenticatorTransportFuture,
// } from "@simplewebauthn/types";

// // Origin is passed dynamically to support both localhost and production
// // without strict mismatch errors.

// export async function createPasskeyRegistrationOptions(
//   user: {
//     id: string;
//     email: string;
//     name: string;
//   },
//   userPasskeys: {
//     id: string;
//     createdAt: Date;
//     updatedAt: Date;
//     userId: string;
//     credentialPublicKey: Uint8Array<ArrayBuffer>;
//     counter: bigint;
//     credentialID: string;
//     transports: string[];
//   }[],
//   origin: string,
// ) {
//   const rpName = env.BUSINESS_NAME || "RanchiKart";
//   const rpID = new URL(origin).hostname;

//   return generateRegistrationOptions({
//     rpName,
//     rpID,
//     userID: Buffer.from(user.id),
//     userName: user.email,
//     userDisplayName: user.name,
//     attestationType: "none",
//     excludeCredentials: userPasskeys.map((passkey) => ({
//       id: passkey.credentialID,
//       transports: passkey.transports as AuthenticatorTransportFuture[],
//     })),
//     authenticatorSelection: {
//       residentKey: "preferred",
//       userVerification: "preferred",
//     },
//   });
// }

// export async function verifyPasskeyRegistration(
//   response: RegistrationResponseJSON,
//   expectedChallenge: string,
//   origin: string,
// ): Promise<VerifiedRegistrationResponse> {
//   const rpID = new URL(origin).hostname;

//   return verifyRegistrationResponse({
//     response,
//     expectedChallenge,
//     expectedOrigin: origin,
//     expectedRPID: rpID,
//   });
// }

// export async function createPasskeyAuthenticationOptions(
//   userPasskeys: {
//     credentialID: string;
//     transports: string[];
//   }[],
//   origin: string,
// ) {
//   const rpID = new URL(origin).hostname;

//   return generateAuthenticationOptions({
//     rpID,
//     allowCredentials: userPasskeys.map((passkey) => ({
//       id: passkey.credentialID,
//       transports: passkey.transports as AuthenticatorTransportFuture[],
//     })),
//     userVerification: "preferred",
//   });
// }

// export async function verifyPasskeyAuthentication(
//   response: AuthenticationResponseJSON,
//   expectedChallenge: string,
//   authenticator: {
//     credentialID: string;
//     credentialPublicKey: Uint8Array;
//     counter: number;
//     transports?: AuthenticatorTransportFuture[];
//   },
//   origin: string,
// ): Promise<VerifiedAuthenticationResponse> {
//   const rpID = new URL(origin).hostname;

//   return verifyAuthenticationResponse({
//     response,
//     expectedChallenge,
//     expectedOrigin: origin,
//     expectedRPID: rpID,
//     credential: {
//       id: authenticator.credentialID,
//       publicKey: authenticator.credentialPublicKey,
//       counter: authenticator.counter,
//       transports: authenticator.transports,
//     },
//   });
// }
