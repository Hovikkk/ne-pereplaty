using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNet.Http;
using Microsoft.AspNet.Hosting;
using Microsoft.AspNet.Builder;
using Microsoft.AspNet.StaticFiles;
using Microsoft.Framework.Logging;
using System.Threading.Tasks;

namespace Nepereplaty.Middleware.AngularServer
{
    public static class AngularServerExtension
    {
        public static IApplicationBuilder UseAngularServer(this IApplicationBuilder builder, string entryPath)
        {
            var options = new AngularServerOptions()
            {
                FileServerOptions = new FileServerOptions()
                {
                    EnableDirectoryBrowsing = false,
                    EnableDefaultFiles = true
                },
                EntryPath = new PathString(entryPath)
            };

            builder.UseDefaultFiles(options.FileServerOptions.DefaultFilesOptions);

            return builder.UseMiddleware<AngularServerMiddleware>(options);
        }
    }

    public class AngularServerOptions
    {
        public FileServerOptions FileServerOptions { get; set; }

        public PathString EntryPath { get; set; }

        public bool Html5Mode
        {
            get
            {
                return EntryPath.HasValue;
            }
        }

        public AngularServerOptions()
        {
            FileServerOptions = new FileServerOptions();
            EntryPath = PathString.Empty;
        }
    }

    public class AngularServerMiddleware
    {
        private readonly AngularServerOptions _options;
        private readonly RequestDelegate _next;
        private readonly StaticFileMiddleware _innerMiddleware;

        public AngularServerMiddleware(RequestDelegate next, IHostingEnvironment hostingEnv, AngularServerOptions options, ILoggerFactory loggerFactory)
        {
            _next = next;
            _options = options;

            _innerMiddleware = new StaticFileMiddleware(next, hostingEnv, options.FileServerOptions.StaticFileOptions, loggerFactory);
        }

        public async Task Invoke(HttpContext context)
        {
            // try to resolve the request with default static file middleware
            await _innerMiddleware.Invoke(context);
            //Console.WriteLine(context.Request.Path + ": " + context.Response.StatusCode);
            // route to root path if the status code is 404
            // and need support angular html5mode
            if (context.Response.StatusCode == 404 && _options.Html5Mode)
            {
                context.Request.Path = _options.EntryPath;
                await _innerMiddleware.Invoke(context);
                //Console.WriteLine(">> " + context.Request.Path + ": " + context.Response.StatusCode);
            }
        }
    }
}
