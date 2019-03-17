namespace SmartHouse.Helpers
{
    public class Constants
    {
        public static class Strings
        {
            public static class JwtClaimIdentifiers
            {
                public const string UserRole = "userRole";
                public const string UserId = "userId";
                public const string AdminRole = "adminRole";
                public const string AdminId = "adminId";
            }

            public static class JwtClaims
            {
                public const string ApiAccess = "api_access";
            }
        }
    }
}
