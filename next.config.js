/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    // @see https://github.com/facebookexperimental/Recoil/issues/2135#issuecomment-1362197710
    RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED: "false",
  },
};

module.exports = nextConfig;
