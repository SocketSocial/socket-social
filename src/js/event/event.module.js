/**
 * @class EventModule
 * Functionality taking API information related to events from the backend and creating components.
 */
module.exports = class {

    constructor() {
        this.api = require('./event.api');
    }

    /**
     *
     */
     makeListEventsPanel($container, $detailContainer) {
         const _this = this;

         this.api.getEvents()
            .then(events => {
                for (let event of events) {
                    let id              = event.id;
                    let description     = event.description;
                    let date            = event.date;
                    let location        = event.location;

                    let eventHtml = `
                        <section class="col-md-3 event_panel text-center" data-id="${id}">
                            <div class="panel panel-info">
                                <header class="panel-heading">
                                    <h3>${date}</h3>
                                </header>
                                <div class="panel-body">
                                    <p>${description}</p>
                                </div>
                                <footer class="panel-footer">
                                    <p>Organized by (name)</p>
                                </footer>
                            </div>
                        </section>
                    `;

                    $container.append(eventHtml);
                }

                const $eventPanel = $(' .event_panel ');

                $eventPanel.each(function () {
                    $(this).on('click', () => {
                        _this.makeEventCard($(this).attr('data-id'), $detailContainer);
                    });
                });

            });
     }

    /**
     *
     */
     makeEventCard(id, $detailContainer) {
         const $eventDetailWrapper     = $(' .event_detail_wrapper ');

         $eventDetailWrapper.show();

         $detailContainer.html('');

         this.api.getEvent(id)
            .then(data => {
                const event       = data.event;
                const description = event.description;
                const date        = event.date;
                const location    = event.location;

                const $eventDetailOptions = $(' .event_detail_options ');

                const eventCardHtml = `
                    <section class="row text-center">
                        <div class="col-xs-12 col-md-4">
                            <h2>Information</h2>
                            <p>${description}</p>
                            <p>Organized by (name)</p>
                        </div>
                        <div class="col-xs-12 col-md-4">
                            <h2>Participants</h2>
                        </div>
                        <div class="col-xs-12 col-md-4">
                            <h2>Location</h2>
                            <p>${location}</p>
                        </div>
                    </section>
                `;

                $detailContainer.append(eventCardHtml);

                $eventDetailOptions.show();
            });
     }

    /**
     *
     */
    makeCreateEventPanel($container) {
        const $createEventDescription = $(' #create_event_description ');
        const $createEventLocation    = $(' #create_event_location ');
        const $createEventDate        = $(' #create_event_date ');
        const $createEventSubmit      = $(' #create_event_submit ');
        const $createEventClear       = $(' #create_event_clear ');

        $createEventSubmit.on('click', () => {
            const data = {
                description: $createEventDescription.val(),
                location: $createEventLocation.val(),
                date: $createEventDate.val()
            };

            this.api.createEvent(data)
                .then(event => console.log(event));
        });

    }

};
