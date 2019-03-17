using FluentValidation.Attributes;
using SmartHouse.ViewModels.Validation;

namespace SmartHouse.ViewModels
{
    [Validator(typeof(CredentialsViewModelValidator))]
    public class CredentialsViewModel
    {
        public string UserName { get; set; }
        public string Password { get; set; }
    }
}
