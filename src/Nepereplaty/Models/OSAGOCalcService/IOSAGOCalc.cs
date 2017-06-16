namespace Nepereplaty.Models.OSAGOCalcService
{
    public interface IOSAGOCalc
    {
        InsuracneCompany Company { get; set; }

        OSAGOOffer GetOffer(OSAGOForm form);
        string GetPrice(OSAGOForm form);
    }
}