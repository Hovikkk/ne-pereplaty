namespace Nepereplaty.Models.CASCOCalcService
{
    public interface ICASCOCalc
    {
        InsuracneCompany Company { get; set; }

        CASCOOffer GetOffer(CASCOForm form);
        string GetPrice(CASCOForm form);
    }
}