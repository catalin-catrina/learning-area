#pragma checksum "C:\pluralsight-learning\7aRecords\02\demos\Web\Pages\AddNewEvent.razor" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "fca46a997941a31f3b81be0bb865d5aec17f65b6"
// <auto-generated/>
#pragma warning disable 1591
namespace Web.Pages
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Components;
#nullable restore
#line 1 "C:\pluralsight-learning\7aRecords\02\demos\Web\_Imports.razor"
using System.Net.Http;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "C:\pluralsight-learning\7aRecords\02\demos\Web\_Imports.razor"
using System.Net.Http.Json;

#line default
#line hidden
#nullable disable
#nullable restore
#line 3 "C:\pluralsight-learning\7aRecords\02\demos\Web\_Imports.razor"
using Microsoft.AspNetCore.Components.Forms;

#line default
#line hidden
#nullable disable
#nullable restore
#line 4 "C:\pluralsight-learning\7aRecords\02\demos\Web\_Imports.razor"
using Microsoft.AspNetCore.Components.Routing;

#line default
#line hidden
#nullable disable
#nullable restore
#line 5 "C:\pluralsight-learning\7aRecords\02\demos\Web\_Imports.razor"
using Microsoft.AspNetCore.Components.Web;

#line default
#line hidden
#nullable disable
#nullable restore
#line 6 "C:\pluralsight-learning\7aRecords\02\demos\Web\_Imports.razor"
using Microsoft.AspNetCore.Components.Web.Virtualization;

#line default
#line hidden
#nullable disable
#nullable restore
#line 7 "C:\pluralsight-learning\7aRecords\02\demos\Web\_Imports.razor"
using Microsoft.AspNetCore.Components.WebAssembly.Http;

#line default
#line hidden
#nullable disable
#nullable restore
#line 8 "C:\pluralsight-learning\7aRecords\02\demos\Web\_Imports.razor"
using Microsoft.JSInterop;

#line default
#line hidden
#nullable disable
#nullable restore
#line 9 "C:\pluralsight-learning\7aRecords\02\demos\Web\_Imports.razor"
using Web;

#line default
#line hidden
#nullable disable
#nullable restore
#line 10 "C:\pluralsight-learning\7aRecords\02\demos\Web\_Imports.razor"
using Web.Shared;

#line default
#line hidden
#nullable disable
#nullable restore
#line 11 "C:\pluralsight-learning\7aRecords\02\demos\Web\_Imports.razor"
using Web.Components;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "C:\pluralsight-learning\7aRecords\02\demos\Web\Pages\AddNewEvent.razor"
using Web.Mappers;

#line default
#line hidden
#nullable disable
#nullable restore
#line 3 "C:\pluralsight-learning\7aRecords\02\demos\Web\Pages\AddNewEvent.razor"
using Web.ViewModels;

#line default
#line hidden
#nullable disable
#nullable restore
#line 4 "C:\pluralsight-learning\7aRecords\02\demos\Web\Pages\AddNewEvent.razor"
using global::Shared.Enums;

#line default
#line hidden
#nullable disable
#nullable restore
#line 5 "C:\pluralsight-learning\7aRecords\02\demos\Web\Pages\AddNewEvent.razor"
using global::Shared.Dtos;

#line default
#line hidden
#nullable disable
    [Microsoft.AspNetCore.Components.RouteAttribute("/addnew")]
    public partial class AddNewEvent : Microsoft.AspNetCore.Components.ComponentBase
    {
        #pragma warning disable 1998
        protected override void BuildRenderTree(Microsoft.AspNetCore.Components.Rendering.RenderTreeBuilder __builder)
        {
            __builder.OpenComponent<Microsoft.AspNetCore.Components.Forms.EditForm>(0);
            __builder.AddAttribute(1, "class", "container mt-5");
            __builder.AddAttribute(2, "Model", global::Microsoft.AspNetCore.Components.CompilerServices.RuntimeHelpers.TypeCheck<System.Object>(
#nullable restore
#line 10 "C:\pluralsight-learning\7aRecords\02\demos\Web\Pages\AddNewEvent.razor"
                                         _eventViewModel

#line default
#line hidden
#nullable disable
            ));
            __builder.AddAttribute(3, "OnValidSubmit", global::Microsoft.AspNetCore.Components.CompilerServices.RuntimeHelpers.TypeCheck<Microsoft.AspNetCore.Components.EventCallback<Microsoft.AspNetCore.Components.Forms.EditContext>>(Microsoft.AspNetCore.Components.EventCallback.Factory.Create<Microsoft.AspNetCore.Components.Forms.EditContext>(this, 
#nullable restore
#line 10 "C:\pluralsight-learning\7aRecords\02\demos\Web\Pages\AddNewEvent.razor"
                                                                          HandleValidSubmit

#line default
#line hidden
#nullable disable
            )));
            __builder.AddAttribute(4, "ChildContent", (Microsoft.AspNetCore.Components.RenderFragment<Microsoft.AspNetCore.Components.Forms.EditContext>)((context) => (__builder2) => {
                __builder2.OpenComponent<Microsoft.AspNetCore.Components.Forms.DataAnnotationsValidator>(5);
                __builder2.CloseComponent();
                __builder2.AddMarkupContent(6, "\n    ");
                __builder2.OpenComponent<Microsoft.AspNetCore.Components.Forms.ValidationSummary>(7);
                __builder2.CloseComponent();
                __builder2.AddMarkupContent(8, "\n    ");
                __builder2.OpenElement(9, "div");
                __builder2.AddAttribute(10, "class", "form-group row");
                __builder2.AddMarkupContent(11, "<label for=\"eventtype\" class=\"col-sm-3\">Event type: </label>\n        ");
                __Blazor.Web.Pages.AddNewEvent.TypeInference.CreateInputSelect_0(__builder2, 12, 13, 
#nullable restore
#line 15 "C:\pluralsight-learning\7aRecords\02\demos\Web\Pages\AddNewEvent.razor"
                                      () => _eventViewModel.EventType

#line default
#line hidden
#nullable disable
                , 14, "eventtype", 15, "form-control col-sm-8", 16, 
#nullable restore
#line 15 "C:\pluralsight-learning\7aRecords\02\demos\Web\Pages\AddNewEvent.razor"
                                                                                                                            _eventViewModel.EventType

#line default
#line hidden
#nullable disable
                , 17, Microsoft.AspNetCore.Components.EventCallback.Factory.Create(this, 
#nullable restore
#line 15 "C:\pluralsight-learning\7aRecords\02\demos\Web\Pages\AddNewEvent.razor"
                                                                                                                                                                     (EventType eventType) => EventTypeChanged(eventType)

#line default
#line hidden
#nullable disable
                ), 18, (__builder3) => {
#nullable restore
#line 16 "C:\pluralsight-learning\7aRecords\02\demos\Web\Pages\AddNewEvent.razor"
             foreach (var eventType in Enum.GetValues(typeof(EventType)))
            {

#line default
#line hidden
#nullable disable
                    __builder3.OpenElement(19, "option");
                    __builder3.AddAttribute(20, "value", 
#nullable restore
#line 18 "C:\pluralsight-learning\7aRecords\02\demos\Web\Pages\AddNewEvent.razor"
                                eventType

#line default
#line hidden
#nullable disable
                    );
#nullable restore
#line 18 "C:\pluralsight-learning\7aRecords\02\demos\Web\Pages\AddNewEvent.razor"
__builder3.AddContent(21, eventType);

#line default
#line hidden
#nullable disable
                    __builder3.CloseElement();
#nullable restore
#line 19 "C:\pluralsight-learning\7aRecords\02\demos\Web\Pages\AddNewEvent.razor"
            }

#line default
#line hidden
#nullable disable
                }
                );
                __builder2.CloseElement();
#nullable restore
#line 23 "C:\pluralsight-learning\7aRecords\02\demos\Web\Pages\AddNewEvent.razor"
     if (_eventViewModel.EventType != EventType.Unknown)
    {

#line default
#line hidden
#nullable disable
                __builder2.OpenElement(22, "div");
                __builder2.AddAttribute(23, "class", "form-group row");
                __builder2.AddMarkupContent(24, "<label for=\"name\" class=\"col-sm-3\">Name: </label>\n            ");
                __builder2.OpenComponent<Microsoft.AspNetCore.Components.Forms.InputText>(25);
                __builder2.AddAttribute(26, "id", "name");
                __builder2.AddAttribute(27, "class", "form-control col-sm-8");
                __builder2.AddAttribute(28, "placeholder", "Enter name");
                __builder2.AddAttribute(29, "Value", global::Microsoft.AspNetCore.Components.CompilerServices.RuntimeHelpers.TypeCheck<System.String>(
#nullable restore
#line 27 "C:\pluralsight-learning\7aRecords\02\demos\Web\Pages\AddNewEvent.razor"
                                                                             _eventViewModel.Name

#line default
#line hidden
#nullable disable
                ));
                __builder2.AddAttribute(30, "ValueChanged", global::Microsoft.AspNetCore.Components.CompilerServices.RuntimeHelpers.TypeCheck<Microsoft.AspNetCore.Components.EventCallback<System.String>>(Microsoft.AspNetCore.Components.EventCallback.Factory.Create<System.String>(this, global::Microsoft.AspNetCore.Components.CompilerServices.RuntimeHelpers.CreateInferredEventCallback(this, __value => _eventViewModel.Name = __value, _eventViewModel.Name))));
                __builder2.AddAttribute(31, "ValueExpression", global::Microsoft.AspNetCore.Components.CompilerServices.RuntimeHelpers.TypeCheck<System.Linq.Expressions.Expression<System.Func<System.String>>>(() => _eventViewModel.Name));
                __builder2.CloseComponent();
                __builder2.CloseElement();
                __builder2.AddMarkupContent(32, "\n        ");
                __builder2.OpenElement(33, "div");
                __builder2.AddAttribute(34, "class", "form-group row");
                __builder2.AddMarkupContent(35, "<label for=\"date\" class=\"col-sm-3\">Date: </label>\n            ");
                __Blazor.Web.Pages.AddNewEvent.TypeInference.CreateInputDate_1(__builder2, 36, 37, "date", 38, "form-control col-sm-8", 39, "Enter date", 40, 
#nullable restore
#line 31 "C:\pluralsight-learning\7aRecords\02\demos\Web\Pages\AddNewEvent.razor"
                                                                             _eventViewModel.Date

#line default
#line hidden
#nullable disable
                , 41, Microsoft.AspNetCore.Components.EventCallback.Factory.Create(this, global::Microsoft.AspNetCore.Components.CompilerServices.RuntimeHelpers.CreateInferredEventCallback(this, __value => _eventViewModel.Date = __value, _eventViewModel.Date)), 42, () => _eventViewModel.Date);
                __builder2.CloseElement();
                __builder2.OpenElement(43, "div");
                __builder2.AddAttribute(44, "class", "form-group row");
                __builder2.AddMarkupContent(45, "<label for=\"venue\" class=\"col-sm-3\">Venue: </label>\n            ");
                __builder2.OpenComponent<Microsoft.AspNetCore.Components.Forms.InputText>(46);
                __builder2.AddAttribute(47, "id", "venue");
                __builder2.AddAttribute(48, "class", "form-control col-sm-8");
                __builder2.AddAttribute(49, "placeholder", "Enter venue");
                __builder2.AddAttribute(50, "Value", global::Microsoft.AspNetCore.Components.CompilerServices.RuntimeHelpers.TypeCheck<System.String>(
#nullable restore
#line 36 "C:\pluralsight-learning\7aRecords\02\demos\Web\Pages\AddNewEvent.razor"
                                                                              _eventViewModel.Venue

#line default
#line hidden
#nullable disable
                ));
                __builder2.AddAttribute(51, "ValueChanged", global::Microsoft.AspNetCore.Components.CompilerServices.RuntimeHelpers.TypeCheck<Microsoft.AspNetCore.Components.EventCallback<System.String>>(Microsoft.AspNetCore.Components.EventCallback.Factory.Create<System.String>(this, global::Microsoft.AspNetCore.Components.CompilerServices.RuntimeHelpers.CreateInferredEventCallback(this, __value => _eventViewModel.Venue = __value, _eventViewModel.Venue))));
                __builder2.AddAttribute(52, "ValueExpression", global::Microsoft.AspNetCore.Components.CompilerServices.RuntimeHelpers.TypeCheck<System.Linq.Expressions.Expression<System.Func<System.String>>>(() => _eventViewModel.Venue));
                __builder2.CloseComponent();
                __builder2.CloseElement();
                __builder2.OpenElement(53, "div");
                __builder2.AddAttribute(54, "class", "form-group row");
                __builder2.AddMarkupContent(55, "<label for=\"capacity\" class=\"col-sm-3\">Capacity: </label>\n            ");
                __Blazor.Web.Pages.AddNewEvent.TypeInference.CreateInputNumber_2(__builder2, 56, 57, "capacity", 58, "form-control col-sm-8", 59, "Enter capacity", 60, 
#nullable restore
#line 41 "C:\pluralsight-learning\7aRecords\02\demos\Web\Pages\AddNewEvent.razor"
                                                                                   _eventViewModel.Capacity

#line default
#line hidden
#nullable disable
                , 61, Microsoft.AspNetCore.Components.EventCallback.Factory.Create(this, global::Microsoft.AspNetCore.Components.CompilerServices.RuntimeHelpers.CreateInferredEventCallback(this, __value => _eventViewModel.Capacity = __value, _eventViewModel.Capacity)), 62, () => _eventViewModel.Capacity);
                __builder2.CloseElement();
                __builder2.OpenElement(63, "div");
                __builder2.AddAttribute(64, "class", "form-group row");
                __builder2.AddMarkupContent(65, "<label for=\"sold\" class=\"col-sm-3\">Sold: </label>\n            ");
                __Blazor.Web.Pages.AddNewEvent.TypeInference.CreateInputNumber_3(__builder2, 66, 67, "sold", 68, "form-control col-sm-8", 69, "Enter sold", 70, 
#nullable restore
#line 46 "C:\pluralsight-learning\7aRecords\02\demos\Web\Pages\AddNewEvent.razor"
                                                                               _eventViewModel.Sold

#line default
#line hidden
#nullable disable
                , 71, Microsoft.AspNetCore.Components.EventCallback.Factory.Create(this, global::Microsoft.AspNetCore.Components.CompilerServices.RuntimeHelpers.CreateInferredEventCallback(this, __value => _eventViewModel.Sold = __value, _eventViewModel.Sold)), 72, () => _eventViewModel.Sold);
                __builder2.CloseElement();
#nullable restore
#line 49 "C:\pluralsight-learning\7aRecords\02\demos\Web\Pages\AddNewEvent.razor"
         if (_eventViewModel is ConferenceViewModel conf)
        {

#line default
#line hidden
#nullable disable
                __builder2.OpenElement(73, "div");
                __builder2.AddAttribute(74, "class", "form-group row");
                __builder2.AddMarkupContent(75, "<label for=\"badgecosts\" class=\"col-sm-3\">Badge costs: </label>\n                ");
                __Blazor.Web.Pages.AddNewEvent.TypeInference.CreateInputNumber_4(__builder2, 76, 77, "badgecosts", 78, "form-control col-sm-8", 79, 
#nullable restore
#line 53 "C:\pluralsight-learning\7aRecords\02\demos\Web\Pages\AddNewEvent.razor"
                                                                                         conf.BadgeCosts

#line default
#line hidden
#nullable disable
                , 80, Microsoft.AspNetCore.Components.EventCallback.Factory.Create(this, global::Microsoft.AspNetCore.Components.CompilerServices.RuntimeHelpers.CreateInferredEventCallback(this, __value => conf.BadgeCosts = __value, conf.BadgeCosts)), 81, () => conf.BadgeCosts);
                __builder2.CloseElement();
                __builder2.OpenElement(82, "div");
                __builder2.AddAttribute(83, "class", "form-group row");
                __builder2.AddMarkupContent(84, "<label for=\"cateringCosts\" class=\"col-sm-3\">Catering costs: </label>\n                ");
                __Blazor.Web.Pages.AddNewEvent.TypeInference.CreateInputNumber_5(__builder2, 85, 86, "cateringCosts", 87, "form-control col-sm-8", 88, 
#nullable restore
#line 58 "C:\pluralsight-learning\7aRecords\02\demos\Web\Pages\AddNewEvent.razor"
                                                                                            conf.CateringCosts

#line default
#line hidden
#nullable disable
                , 89, Microsoft.AspNetCore.Components.EventCallback.Factory.Create(this, global::Microsoft.AspNetCore.Components.CompilerServices.RuntimeHelpers.CreateInferredEventCallback(this, __value => conf.CateringCosts = __value, conf.CateringCosts)), 90, () => conf.CateringCosts);
                __builder2.CloseElement();
#nullable restore
#line 60 "C:\pluralsight-learning\7aRecords\02\demos\Web\Pages\AddNewEvent.razor"
        }

#line default
#line hidden
#nullable disable
#nullable restore
#line 62 "C:\pluralsight-learning\7aRecords\02\demos\Web\Pages\AddNewEvent.razor"
         if (_eventViewModel is MultiDayConferenceViewModel multiDayConf)
        {

#line default
#line hidden
#nullable disable
                __builder2.OpenElement(91, "div");
                __builder2.AddAttribute(92, "class", "form-group row");
                __builder2.AddMarkupContent(93, "<label for=\"numberofdays\" class=\"col-sm-3\">Number of days: </label>\n                ");
                __Blazor.Web.Pages.AddNewEvent.TypeInference.CreateInputNumber_6(__builder2, 94, 95, "numberofdays", 96, "form-control col-sm-8", 97, 
#nullable restore
#line 66 "C:\pluralsight-learning\7aRecords\02\demos\Web\Pages\AddNewEvent.razor"
                                                                                           multiDayConf.NumberOfDays

#line default
#line hidden
#nullable disable
                , 98, Microsoft.AspNetCore.Components.EventCallback.Factory.Create(this, global::Microsoft.AspNetCore.Components.CompilerServices.RuntimeHelpers.CreateInferredEventCallback(this, __value => multiDayConf.NumberOfDays = __value, multiDayConf.NumberOfDays)), 99, () => multiDayConf.NumberOfDays);
                __builder2.CloseElement();
#nullable restore
#line 68 "C:\pluralsight-learning\7aRecords\02\demos\Web\Pages\AddNewEvent.razor"
        }

#line default
#line hidden
#nullable disable
#nullable restore
#line 70 "C:\pluralsight-learning\7aRecords\02\demos\Web\Pages\AddNewEvent.razor"
         if (_eventViewModel is ConcertViewModel concert)
        {

#line default
#line hidden
#nullable disable
                __builder2.OpenElement(100, "div");
                __builder2.AddAttribute(101, "class", "form-group row");
                __builder2.AddMarkupContent(102, "<label for=\"artistCosts\" class=\"col-sm-3\">Artist costs: </label>\n                ");
                __Blazor.Web.Pages.AddNewEvent.TypeInference.CreateInputNumber_7(__builder2, 103, 104, "artistCosts", 105, "form-control col-sm-8", 106, 
#nullable restore
#line 74 "C:\pluralsight-learning\7aRecords\02\demos\Web\Pages\AddNewEvent.razor"
                                                                                          concert.ArtistCosts

#line default
#line hidden
#nullable disable
                , 107, Microsoft.AspNetCore.Components.EventCallback.Factory.Create(this, global::Microsoft.AspNetCore.Components.CompilerServices.RuntimeHelpers.CreateInferredEventCallback(this, __value => concert.ArtistCosts = __value, concert.ArtistCosts)), 108, () => concert.ArtistCosts);
                __builder2.CloseElement();
#nullable restore
#line 76 "C:\pluralsight-learning\7aRecords\02\demos\Web\Pages\AddNewEvent.razor"
        }

#line default
#line hidden
#nullable disable
#nullable restore
#line 78 "C:\pluralsight-learning\7aRecords\02\demos\Web\Pages\AddNewEvent.razor"
         if (_eventViewModel is SportsGameViewModel sportsGame)
        {

#line default
#line hidden
#nullable disable
                __builder2.OpenElement(109, "div");
                __builder2.AddAttribute(110, "class", "form-group row");
                __builder2.AddMarkupContent(111, "<label for=\"noPlayers\" class=\"col-sm-3\">Number of players: </label>\n                ");
                __Blazor.Web.Pages.AddNewEvent.TypeInference.CreateInputNumber_8(__builder2, 112, 113, "noPlayers", 114, "form-control col-sm-8", 115, 
#nullable restore
#line 82 "C:\pluralsight-learning\7aRecords\02\demos\Web\Pages\AddNewEvent.razor"
                                                                                        sportsGame.NumberOfPlayers

#line default
#line hidden
#nullable disable
                , 116, Microsoft.AspNetCore.Components.EventCallback.Factory.Create(this, global::Microsoft.AspNetCore.Components.CompilerServices.RuntimeHelpers.CreateInferredEventCallback(this, __value => sportsGame.NumberOfPlayers = __value, sportsGame.NumberOfPlayers)), 117, () => sportsGame.NumberOfPlayers);
                __builder2.CloseElement();
#nullable restore
#line 84 "C:\pluralsight-learning\7aRecords\02\demos\Web\Pages\AddNewEvent.razor"
        }

#line default
#line hidden
#nullable disable
                __builder2.AddMarkupContent(118, "<button type=\"submit\" class=\"btn btn-primary edit-btn\">Add</button>");
#nullable restore
#line 86 "C:\pluralsight-learning\7aRecords\02\demos\Web\Pages\AddNewEvent.razor"
    }

#line default
#line hidden
#nullable disable
            }
            ));
            __builder.CloseComponent();
        }
        #pragma warning restore 1998
#nullable restore
#line 91 "C:\pluralsight-learning\7aRecords\02\demos\Web\Pages\AddNewEvent.razor"
 
    private EventViewModel _eventViewModel = new();

    private void EventTypeChanged(EventType eventType)
    {
        if (_eventViewModel.EventType == eventType)
            return;

        EventViewModel newViewModel;

        switch (eventType)
        {
            case EventType.Unknown:
                newViewModel = new EventViewModel();
                break;
            case EventType.Conference:
                newViewModel = new ConferenceViewModel();
                break;
            case EventType.MultiDayConference:
                newViewModel = new MultiDayConferenceViewModel();
                break;
            case EventType.Concert:
                newViewModel = new ConcertViewModel();
                break;
            case EventType.SportsGame:
                newViewModel = new SportsGameViewModel();
                break;
            default:
                throw new ArgumentException($"Unknown event type {eventType}");
        }

        EventMapper.CopyBaseProperties(_eventViewModel, newViewModel);
        newViewModel.EventType = eventType;
        _eventViewModel = newViewModel;
    }

    private async Task HandleValidSubmit()
    {
        EventDto dto = null;
        if (_eventViewModel is ConferenceViewModel conferenceViewModel)
            dto = EventMapper.ConvertConferenceViewModelToDto(conferenceViewModel);
        if (_eventViewModel is MultiDayConferenceViewModel multiDayConferenceViewModel)
            dto = EventMapper.ConvertMultiDayConferenceViewModelToDto(multiDayConferenceViewModel);
        if (_eventViewModel is ConcertViewModel concertViewModel)
            dto = EventMapper.ConvertConcertViewModelToDto(concertViewModel);
        if (_eventViewModel is SportsGameViewModel sportsGameViewModel)
            dto = EventMapper.ConvertSportsGameViewModelToDto(sportsGameViewModel);
        if (dto == null)
            throw new ArgumentException("Unknown viewmodel type");

        var result = await HttpClient.PostAsJsonAsync(_eventViewModel.ApiEndpoint, dto);
        result.EnsureSuccessStatusCode();
        NavigationManager.NavigateTo("/");
    }

#line default
#line hidden
#nullable disable
        [global::Microsoft.AspNetCore.Components.InjectAttribute] private NavigationManager NavigationManager { get; set; }
        [global::Microsoft.AspNetCore.Components.InjectAttribute] private HttpClient HttpClient { get; set; }
        [global::Microsoft.AspNetCore.Components.InjectAttribute] private EventMapper EventMapper { get; set; }
    }
}
namespace __Blazor.Web.Pages.AddNewEvent
{
    #line hidden
    internal static class TypeInference
    {
        public static void CreateInputSelect_0<TValue>(global::Microsoft.AspNetCore.Components.Rendering.RenderTreeBuilder __builder, int seq, int __seq0, global::System.Linq.Expressions.Expression<global::System.Func<TValue>> __arg0, int __seq1, System.Object __arg1, int __seq2, System.Object __arg2, int __seq3, TValue __arg3, int __seq4, global::Microsoft.AspNetCore.Components.EventCallback<TValue> __arg4, int __seq5, global::Microsoft.AspNetCore.Components.RenderFragment __arg5)
        {
        __builder.OpenComponent<global::Microsoft.AspNetCore.Components.Forms.InputSelect<TValue>>(seq);
        __builder.AddAttribute(__seq0, "ValueExpression", __arg0);
        __builder.AddAttribute(__seq1, "id", __arg1);
        __builder.AddAttribute(__seq2, "class", __arg2);
        __builder.AddAttribute(__seq3, "Value", __arg3);
        __builder.AddAttribute(__seq4, "ValueChanged", __arg4);
        __builder.AddAttribute(__seq5, "ChildContent", __arg5);
        __builder.CloseComponent();
        }
        public static void CreateInputDate_1<TValue>(global::Microsoft.AspNetCore.Components.Rendering.RenderTreeBuilder __builder, int seq, int __seq0, System.Object __arg0, int __seq1, System.Object __arg1, int __seq2, System.Object __arg2, int __seq3, TValue __arg3, int __seq4, global::Microsoft.AspNetCore.Components.EventCallback<TValue> __arg4, int __seq5, global::System.Linq.Expressions.Expression<global::System.Func<TValue>> __arg5)
        {
        __builder.OpenComponent<global::Microsoft.AspNetCore.Components.Forms.InputDate<TValue>>(seq);
        __builder.AddAttribute(__seq0, "id", __arg0);
        __builder.AddAttribute(__seq1, "class", __arg1);
        __builder.AddAttribute(__seq2, "placeholder", __arg2);
        __builder.AddAttribute(__seq3, "Value", __arg3);
        __builder.AddAttribute(__seq4, "ValueChanged", __arg4);
        __builder.AddAttribute(__seq5, "ValueExpression", __arg5);
        __builder.CloseComponent();
        }
        public static void CreateInputNumber_2<TValue>(global::Microsoft.AspNetCore.Components.Rendering.RenderTreeBuilder __builder, int seq, int __seq0, System.Object __arg0, int __seq1, System.Object __arg1, int __seq2, System.Object __arg2, int __seq3, TValue __arg3, int __seq4, global::Microsoft.AspNetCore.Components.EventCallback<TValue> __arg4, int __seq5, global::System.Linq.Expressions.Expression<global::System.Func<TValue>> __arg5)
        {
        __builder.OpenComponent<global::Microsoft.AspNetCore.Components.Forms.InputNumber<TValue>>(seq);
        __builder.AddAttribute(__seq0, "id", __arg0);
        __builder.AddAttribute(__seq1, "class", __arg1);
        __builder.AddAttribute(__seq2, "placeholder", __arg2);
        __builder.AddAttribute(__seq3, "Value", __arg3);
        __builder.AddAttribute(__seq4, "ValueChanged", __arg4);
        __builder.AddAttribute(__seq5, "ValueExpression", __arg5);
        __builder.CloseComponent();
        }
        public static void CreateInputNumber_3<TValue>(global::Microsoft.AspNetCore.Components.Rendering.RenderTreeBuilder __builder, int seq, int __seq0, System.Object __arg0, int __seq1, System.Object __arg1, int __seq2, System.Object __arg2, int __seq3, TValue __arg3, int __seq4, global::Microsoft.AspNetCore.Components.EventCallback<TValue> __arg4, int __seq5, global::System.Linq.Expressions.Expression<global::System.Func<TValue>> __arg5)
        {
        __builder.OpenComponent<global::Microsoft.AspNetCore.Components.Forms.InputNumber<TValue>>(seq);
        __builder.AddAttribute(__seq0, "id", __arg0);
        __builder.AddAttribute(__seq1, "class", __arg1);
        __builder.AddAttribute(__seq2, "placeholder", __arg2);
        __builder.AddAttribute(__seq3, "Value", __arg3);
        __builder.AddAttribute(__seq4, "ValueChanged", __arg4);
        __builder.AddAttribute(__seq5, "ValueExpression", __arg5);
        __builder.CloseComponent();
        }
        public static void CreateInputNumber_4<TValue>(global::Microsoft.AspNetCore.Components.Rendering.RenderTreeBuilder __builder, int seq, int __seq0, System.Object __arg0, int __seq1, System.Object __arg1, int __seq2, TValue __arg2, int __seq3, global::Microsoft.AspNetCore.Components.EventCallback<TValue> __arg3, int __seq4, global::System.Linq.Expressions.Expression<global::System.Func<TValue>> __arg4)
        {
        __builder.OpenComponent<global::Microsoft.AspNetCore.Components.Forms.InputNumber<TValue>>(seq);
        __builder.AddAttribute(__seq0, "id", __arg0);
        __builder.AddAttribute(__seq1, "class", __arg1);
        __builder.AddAttribute(__seq2, "Value", __arg2);
        __builder.AddAttribute(__seq3, "ValueChanged", __arg3);
        __builder.AddAttribute(__seq4, "ValueExpression", __arg4);
        __builder.CloseComponent();
        }
        public static void CreateInputNumber_5<TValue>(global::Microsoft.AspNetCore.Components.Rendering.RenderTreeBuilder __builder, int seq, int __seq0, System.Object __arg0, int __seq1, System.Object __arg1, int __seq2, TValue __arg2, int __seq3, global::Microsoft.AspNetCore.Components.EventCallback<TValue> __arg3, int __seq4, global::System.Linq.Expressions.Expression<global::System.Func<TValue>> __arg4)
        {
        __builder.OpenComponent<global::Microsoft.AspNetCore.Components.Forms.InputNumber<TValue>>(seq);
        __builder.AddAttribute(__seq0, "id", __arg0);
        __builder.AddAttribute(__seq1, "class", __arg1);
        __builder.AddAttribute(__seq2, "Value", __arg2);
        __builder.AddAttribute(__seq3, "ValueChanged", __arg3);
        __builder.AddAttribute(__seq4, "ValueExpression", __arg4);
        __builder.CloseComponent();
        }
        public static void CreateInputNumber_6<TValue>(global::Microsoft.AspNetCore.Components.Rendering.RenderTreeBuilder __builder, int seq, int __seq0, System.Object __arg0, int __seq1, System.Object __arg1, int __seq2, TValue __arg2, int __seq3, global::Microsoft.AspNetCore.Components.EventCallback<TValue> __arg3, int __seq4, global::System.Linq.Expressions.Expression<global::System.Func<TValue>> __arg4)
        {
        __builder.OpenComponent<global::Microsoft.AspNetCore.Components.Forms.InputNumber<TValue>>(seq);
        __builder.AddAttribute(__seq0, "id", __arg0);
        __builder.AddAttribute(__seq1, "class", __arg1);
        __builder.AddAttribute(__seq2, "Value", __arg2);
        __builder.AddAttribute(__seq3, "ValueChanged", __arg3);
        __builder.AddAttribute(__seq4, "ValueExpression", __arg4);
        __builder.CloseComponent();
        }
        public static void CreateInputNumber_7<TValue>(global::Microsoft.AspNetCore.Components.Rendering.RenderTreeBuilder __builder, int seq, int __seq0, System.Object __arg0, int __seq1, System.Object __arg1, int __seq2, TValue __arg2, int __seq3, global::Microsoft.AspNetCore.Components.EventCallback<TValue> __arg3, int __seq4, global::System.Linq.Expressions.Expression<global::System.Func<TValue>> __arg4)
        {
        __builder.OpenComponent<global::Microsoft.AspNetCore.Components.Forms.InputNumber<TValue>>(seq);
        __builder.AddAttribute(__seq0, "id", __arg0);
        __builder.AddAttribute(__seq1, "class", __arg1);
        __builder.AddAttribute(__seq2, "Value", __arg2);
        __builder.AddAttribute(__seq3, "ValueChanged", __arg3);
        __builder.AddAttribute(__seq4, "ValueExpression", __arg4);
        __builder.CloseComponent();
        }
        public static void CreateInputNumber_8<TValue>(global::Microsoft.AspNetCore.Components.Rendering.RenderTreeBuilder __builder, int seq, int __seq0, System.Object __arg0, int __seq1, System.Object __arg1, int __seq2, TValue __arg2, int __seq3, global::Microsoft.AspNetCore.Components.EventCallback<TValue> __arg3, int __seq4, global::System.Linq.Expressions.Expression<global::System.Func<TValue>> __arg4)
        {
        __builder.OpenComponent<global::Microsoft.AspNetCore.Components.Forms.InputNumber<TValue>>(seq);
        __builder.AddAttribute(__seq0, "id", __arg0);
        __builder.AddAttribute(__seq1, "class", __arg1);
        __builder.AddAttribute(__seq2, "Value", __arg2);
        __builder.AddAttribute(__seq3, "ValueChanged", __arg3);
        __builder.AddAttribute(__seq4, "ValueExpression", __arg4);
        __builder.CloseComponent();
        }
    }
}
#pragma warning restore 1591