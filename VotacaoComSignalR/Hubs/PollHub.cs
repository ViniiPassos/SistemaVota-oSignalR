using Microsoft.AspNetCore.SignalR;

namespace VotacaoComSignalR.Hubs
{
    public class PollHub : Hub
    {
        public async Task SendMessage (string user, string message, string myBandlId, string myBandval)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message, myBandlId, myBandval).ConfigureAwait (false);
        }
    }
}
