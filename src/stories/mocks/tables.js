const tablesData = [
  {
    name: 'datadog_dashboard_lists',
    title: 'Datadog Dashboard Lists',
    description: '',
    columns: [
      {
        name: '_cq_id',
        type: 'uuid',
      },
      {
        name: '_cq_parent_id',
        type: 'uuid',
      },
      {
        name: 'account_name',
        type: 'utf8',
        is_primary_key: true,
      },
      {
        name: 'author',
        type: 'json',
        type_schema:
          '{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"email":"utf8","handle":"utf8","name":"utf8"}',
      },
      {
        name: 'created',
        type: 'timestamp[us, tz=UTC]',
      },
      {
        name: 'dashboard_count',
        type: 'int64',
      },
      {
        name: 'id',
        type: 'int64',
        is_primary_key: true,
      },
      {
        name: 'is_favorite',
        type: 'bool',
      },
      {
        name: 'modified',
        type: 'timestamp[us, tz=UTC]',
      },
      {
        name: 'name',
        type: 'utf8',
      },
      {
        name: 'type',
        type: 'utf8',
      },
      {
        name: 'additional_properties',
        type: 'json',
        type_schema: '{"utf8":"any"}',
      },
    ],
    relations: [],
    is_paid: true,
  },
  {
    name: 'datadog_dashboards',
    title: 'Datadog Dashboards',
    description: '',
    columns: [
      {
        name: '_cq_id',
        type: 'uuid',
      },
      {
        name: '_cq_parent_id',
        type: 'uuid',
      },
      {
        name: 'account_name',
        type: 'utf8',
        is_primary_key: true,
      },
      {
        name: 'author_handle',
        type: 'utf8',
      },
      {
        name: 'created_at',
        type: 'timestamp[us, tz=UTC]',
      },
      {
        name: 'description',
        type: 'utf8',
      },
      {
        name: 'id',
        type: 'utf8',
        is_primary_key: true,
      },
      {
        name: 'is_read_only',
        type: 'bool',
      },
      {
        name: 'layout_type',
        type: 'utf8',
      },
      {
        name: 'modified_at',
        type: 'timestamp[us, tz=UTC]',
      },
      {
        name: 'title',
        type: 'utf8',
      },
      {
        name: 'url',
        type: 'utf8',
      },
      {
        name: 'additional_properties',
        type: 'json',
        type_schema: '{"utf8":"any"}',
      },
    ],
    relations: [],
    is_paid: true,
  },
  {
    name: 'datadog_downtimes',
    title: 'Datadog Downtimes',
    description: '',
    columns: [
      {
        name: '_cq_id',
        type: 'uuid',
      },
      {
        name: '_cq_parent_id',
        type: 'uuid',
      },
      {
        name: 'account_name',
        type: 'utf8',
        is_primary_key: true,
      },
      {
        name: 'active',
        type: 'bool',
      },
      {
        name: 'active_child',
        type: 'json',
        type_schema: '{}',
      },
      {
        name: 'canceled',
        type: 'int64',
      },
      {
        name: 'creator_id',
        type: 'int64',
      },
      {
        name: 'disabled',
        type: 'bool',
      },
      {
        name: 'downtime_type',
        type: 'int64',
      },
      {
        name: 'end',
        type: 'int64',
      },
      {
        name: 'id',
        type: 'int64',
        is_primary_key: true,
      },
      {
        name: 'message',
        type: 'utf8',
      },
      {
        name: 'monitor_id',
        type: 'int64',
      },
      {
        name: 'monitor_tags',
        type: 'list<item: utf8, nullable>',
      },
      {
        name: 'mute_first_recovery_notification',
        type: 'bool',
      },
      {
        name: 'notify_end_states',
        type: 'list<item: utf8, nullable>',
      },
      {
        name: 'notify_end_types',
        type: 'list<item: utf8, nullable>',
      },
      {
        name: 'parent_id',
        type: 'int64',
      },
      {
        name: 'recurrence',
        type: 'json',
        type_schema: '{}',
      },
      {
        name: 'scope',
        type: 'list<item: utf8, nullable>',
      },
      {
        name: 'start',
        type: 'int64',
      },
      {
        name: 'timezone',
        type: 'utf8',
      },
      {
        name: 'updater_id',
        type: 'int32',
      },
      {
        name: 'additional_properties',
        type: 'json',
        type_schema: '{"utf8":"any"}',
      },
    ],
    relations: [],
    is_paid: true,
  },
  {
    name: 'datadog_events',
    title: 'Datadog Events',
    description: '',
    columns: [
      {
        name: '_cq_id',
        type: 'uuid',
      },
      {
        name: '_cq_parent_id',
        type: 'uuid',
      },
      {
        name: 'account_name',
        type: 'utf8',
        is_primary_key: true,
      },
      {
        name: 'attributes',
        type: 'json',
        type_schema:
          '{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"attributes":{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"aggregation_key":"utf8","date_happened":"int64","device_name":"utf8","duration":"int64","event_object":"utf8","evt":{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"id":"utf8","name":"utf8","source_id":"int64","type":"utf8"},"hostname":"utf8","monitor":{},"monitor_groups":{},"monitor_id":"int64","priority":{},"related_event_id":"int64","service":"utf8","source_type_name":"utf8","sourcecategory":"utf8","status":"utf8","tags":["utf8"],"timestamp":"int64","title":"utf8"},"message":"utf8","tags":["utf8"],"timestamp":"timestamp[us, tz=UTC]"}',
      },
      {
        name: 'id',
        type: 'utf8',
        is_primary_key: true,
      },
      {
        name: 'type',
        type: 'utf8',
      },
      {
        name: 'additional_properties',
        type: 'json',
        type_schema: '{"utf8":"any"}',
      },
    ],
    relations: [],
    is_paid: true,
  },
  {
    name: 'datadog_global_variables',
    title: 'Datadog Global Variables',
    description: '',
    columns: [
      {
        name: '_cq_id',
        type: 'uuid',
      },
      {
        name: '_cq_parent_id',
        type: 'uuid',
      },
      {
        name: 'account_name',
        type: 'utf8',
        is_primary_key: true,
      },
      {
        name: 'attributes',
        type: 'json',
        type_schema:
          '{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"restricted_roles":["utf8"]}',
      },
      {
        name: 'description',
        type: 'utf8',
      },
      {
        name: 'id',
        type: 'utf8',
        is_primary_key: true,
      },
      {
        name: 'name',
        type: 'utf8',
      },
      {
        name: 'parse_test_options',
        type: 'json',
        type_schema:
          '{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"field":"utf8","local_variable_name":"utf8","parser":{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"type":"utf8","value":"utf8"},"type":"utf8"}',
      },
      {
        name: 'parse_test_public_id',
        type: 'utf8',
      },
      {
        name: 'tags',
        type: 'list<item: utf8, nullable>',
      },
      {
        name: 'value',
        type: 'json',
        type_schema:
          '{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"options":{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"totp_parameters":{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"digits":"int64","refresh_interval":"int64"}},"secure":"bool","value":"utf8"}',
      },
      {
        name: 'additional_properties',
        type: 'json',
        type_schema: '{"utf8":"any"}',
      },
    ],
    relations: [],
    is_paid: true,
  },
  {
    name: 'datadog_hosts',
    title: 'Datadog Hosts',
    description: '',
    columns: [
      {
        name: '_cq_id',
        type: 'uuid',
      },
      {
        name: '_cq_parent_id',
        type: 'uuid',
      },
      {
        name: 'account_name',
        type: 'utf8',
        is_primary_key: true,
      },
      {
        name: 'aliases',
        type: 'list<item: utf8, nullable>',
      },
      {
        name: 'apps',
        type: 'list<item: utf8, nullable>',
      },
      {
        name: 'aws_name',
        type: 'utf8',
      },
      {
        name: 'host_name',
        type: 'utf8',
      },
      {
        name: 'id',
        type: 'int64',
        is_primary_key: true,
      },
      {
        name: 'is_muted',
        type: 'bool',
      },
      {
        name: 'last_reported_time',
        type: 'int64',
      },
      {
        name: 'meta',
        type: 'json',
        type_schema:
          '{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"agent_checks":[["any"]],"agent_version":"utf8","cpu_cores":"int64","fbsd_v":["any"],"gohai":"utf8","install_method":{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"installer_version":"utf8","tool":"utf8","tool_version":"utf8"},"mac_v":["any"],"machine":"utf8","nix_v":["any"],"platform":"utf8","processor":"utf8","python_v":"utf8","socket_fqdn":"utf8","socket_hostname":"utf8","win_v":["any"]}',
      },
      {
        name: 'metrics',
        type: 'json',
        type_schema:
          '{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"cpu":"float64","iowait":"float64","load":"float64"}',
      },
      {
        name: 'mute_timeout',
        type: 'int64',
      },
      {
        name: 'name',
        type: 'utf8',
      },
      {
        name: 'sources',
        type: 'list<item: utf8, nullable>',
      },
      {
        name: 'tags_by_source',
        type: 'json',
        type_schema: '{"utf8":["utf8"]}',
      },
      {
        name: 'up',
        type: 'bool',
      },
      {
        name: 'additional_properties',
        type: 'json',
        type_schema: '{"utf8":"any"}',
      },
    ],
    relations: [],
    is_paid: true,
  },
  {
    name: 'datadog_incidents',
    title: 'Datadog Incidents',
    description: '',
    columns: [
      {
        name: '_cq_id',
        type: 'uuid',
      },
      {
        name: '_cq_parent_id',
        type: 'uuid',
      },
      {
        name: 'account_name',
        type: 'utf8',
        is_primary_key: true,
      },
      {
        name: 'attributes',
        type: 'json',
        type_schema:
          '{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"archived":"timestamp[us, tz=UTC]","case_id":"int64","created":"timestamp[us, tz=UTC]","customer_impact_duration":"int64","customer_impact_end":"timestamp[us, tz=UTC]","customer_impact_scope":"utf8","customer_impact_start":"timestamp[us, tz=UTC]","customer_impacted":"bool","detected":"timestamp[us, tz=UTC]","fields":{"utf8":{"incident_field_attributes_multiple_value":{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"type":"utf8","value":{}},"incident_field_attributes_single_value":{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"type":"utf8","value":"utf8"},"unparsed_object":"any"}},"modified":"timestamp[us, tz=UTC]","non_datadog_creator":{},"notification_handles":[{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"display_name":"utf8","handle":"utf8"}],"public_id":"int64","resolved":"timestamp[us, tz=UTC]","severity":"utf8","state":"utf8","time_to_detect":"int64","time_to_internal_response":"int64","time_to_repair":"int64","time_to_resolve":"int64","title":"utf8","visibility":"utf8"}',
      },
      {
        name: 'id',
        type: 'utf8',
        is_primary_key: true,
      },
      {
        name: 'relationships',
        type: 'json',
        type_schema:
          '{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"attachments":{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"data":[{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"id":"utf8","type":"utf8"}]},"commander_user":{},"created_by_user":{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"data":{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"id":"utf8","type":"utf8"}},"impacts":{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"data":[{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"id":"utf8","type":"utf8"}]},"integrations":{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"data":[{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"id":"utf8","type":"utf8"}]},"last_modified_by_user":{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"data":{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"id":"utf8","type":"utf8"}},"responders":{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"data":[{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"id":"utf8","type":"utf8"}]},"user_defined_fields":{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"data":[{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"id":"utf8","type":"utf8"}]}}',
      },
      {
        name: 'type',
        type: 'utf8',
      },
      {
        name: 'additional_properties',
        type: 'json',
        type_schema: '{"utf8":"any"}',
      },
    ],
    relations: [
      {
        name: 'datadog_incident_attachments',
        title: 'Datadog Incident Attachments',
        description: '',
        columns: [
          {
            name: '_cq_id',
            type: 'uuid',
          },
          {
            name: '_cq_parent_id',
            type: 'uuid',
          },
          {
            name: 'account_name',
            type: 'utf8',
            is_primary_key: true,
          },
          {
            name: 'incident_id',
            type: 'utf8',
            is_primary_key: true,
          },
          {
            name: 'attributes',
            type: 'json',
            type_schema:
              '{"incident_attachment_link_attributes":{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"attachment":{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"document_url":"utf8","title":"utf8"},"attachment_type":"utf8","modified":"timestamp[us, tz=UTC]"},"incident_attachment_postmortem_attributes":{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"attachment":{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"document_url":"utf8","title":"utf8"},"attachment_type":"utf8"},"unparsed_object":"any"}',
          },
          {
            name: 'id',
            type: 'utf8',
            is_primary_key: true,
          },
          {
            name: 'relationships',
            type: 'json',
            type_schema:
              '{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"last_modified_by_user":{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"data":{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"id":"utf8","type":"utf8"}}}',
          },
          {
            name: 'type',
            type: 'utf8',
          },
          {
            name: 'additional_properties',
            type: 'json',
            type_schema: '{"utf8":"any"}',
          },
        ],
        relations: [],
        is_paid: true,
      },
    ],
    is_paid: true,
  },
  {
    name: 'datadog_monitors',
    title: 'Datadog Monitors',
    description: '',
    columns: [
      {
        name: '_cq_id',
        type: 'uuid',
      },
      {
        name: '_cq_parent_id',
        type: 'uuid',
      },
      {
        name: 'account_name',
        type: 'utf8',
        is_primary_key: true,
      },
      {
        name: 'created',
        type: 'timestamp[us, tz=UTC]',
      },
      {
        name: 'creator',
        type: 'json',
        type_schema:
          '{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"email":"utf8","handle":"utf8","name":"utf8"}',
      },
      {
        name: 'deleted',
        type: 'timestamp[us, tz=UTC]',
      },
      {
        name: 'id',
        type: 'int64',
        is_primary_key: true,
      },
      {
        name: 'matching_downtimes',
        type: 'json',
        type_schema:
          '[{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"end":"int64","id":"int64","scope":["utf8"],"start":"int64"}]',
      },
      {
        name: 'message',
        type: 'utf8',
      },
      {
        name: 'modified',
        type: 'timestamp[us, tz=UTC]',
      },
      {
        name: 'multi',
        type: 'bool',
      },
      {
        name: 'name',
        type: 'utf8',
      },
      {
        name: 'options',
        type: 'json',
        type_schema:
          '{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"aggregation":{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"group_by":"utf8","metric":"utf8","type":"utf8"},"device_ids":["utf8"],"enable_logs_sample":"bool","enable_samples":"bool","escalation_message":"utf8","evaluation_delay":"int64","group_retention_duration":"utf8","groupby_simple_monitor":"bool","include_tags":"bool","locked":"bool","min_failure_duration":"int64","min_location_failed":"int64","new_group_delay":"int64","new_host_delay":"int64","no_data_timeframe":"int64","notification_preset_name":"utf8","notify_audit":"bool","notify_by":["utf8"],"notify_no_data":"bool","on_missing_data":"utf8","renotify_interval":"int64","renotify_occurrences":"int64","renotify_statuses":["utf8"],"require_full_window":"bool","scheduling_options":{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"custom_schedule":{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"recurrences":[{"":"json","additional_properties":"json","rrule":"utf8","start":"utf8","timezone":"utf8"}]},"evaluation_window":{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"day_starts":"utf8","hour_starts":"int64","month_starts":"int64"}},"silenced":{"utf8":"int64"},"synthetics_check_id":"utf8","threshold_windows":{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"recovery_window":"utf8","trigger_window":"utf8"},"thresholds":{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"critical":"float64","critical_recovery":"float64","ok":"float64","unknown":"float64","warning":"float64","warning_recovery":"float64"},"timeout_h":"int64","variables":[{"monitor_formula_and_function_event_query_definition":{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"compute":{"":"json","additional_properties":"json","aggregation":"utf8","interval":"int64","metric":"utf8"},"data_source":"utf8","group_by":[{"":"json","additional_properties":"json","facet":"utf8","limit":"int64","sort":"json"}],"indexes":["utf8"],"name":"utf8","search":{"":"json","additional_properties":"json","query":"utf8"}},"unparsed_object":"any"}]}',
      },
      {
        name: 'overall_state',
        type: 'utf8',
      },
      {
        name: 'priority',
        type: 'int64',
      },
      {
        name: 'query',
        type: 'utf8',
      },
      {
        name: 'restricted_roles',
        type: 'json',
        type_schema: '{}',
      },
      {
        name: 'state',
        type: 'json',
        type_schema:
          '{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"groups":{"utf8":{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"last_nodata_ts":"int64","last_notified_ts":"int64","last_resolved_ts":"int64","last_triggered_ts":"int64","name":"utf8","status":"utf8"}}}',
      },
      {
        name: 'tags',
        type: 'list<item: utf8, nullable>',
      },
      {
        name: 'type',
        type: 'utf8',
      },
      {
        name: 'additional_properties',
        type: 'json',
        type_schema: '{"utf8":"any"}',
      },
    ],
    relations: [
      {
        name: 'datadog_monitor_downtimes',
        title: 'Datadog Monitor Downtimes',
        description: '',
        columns: [
          {
            name: '_cq_id',
            type: 'uuid',
          },
          {
            name: '_cq_parent_id',
            type: 'uuid',
          },
          {
            name: 'account_name',
            type: 'utf8',
            is_primary_key: true,
          },
          {
            name: 'monitor_id',
            type: 'int64',
            is_primary_key: true,
          },
          {
            name: 'active',
            type: 'bool',
          },
          {
            name: 'active_child',
            type: 'json',
            type_schema: '{}',
          },
          {
            name: 'canceled',
            type: 'int64',
          },
          {
            name: 'creator_id',
            type: 'int64',
          },
          {
            name: 'disabled',
            type: 'bool',
          },
          {
            name: 'downtime_type',
            type: 'int64',
          },
          {
            name: 'end',
            type: 'int64',
          },
          {
            name: 'id',
            type: 'int64',
            is_primary_key: true,
          },
          {
            name: 'message',
            type: 'utf8',
          },
          {
            name: 'monitor_tags',
            type: 'list<item: utf8, nullable>',
          },
          {
            name: 'mute_first_recovery_notification',
            type: 'bool',
          },
          {
            name: 'notify_end_states',
            type: 'list<item: utf8, nullable>',
          },
          {
            name: 'notify_end_types',
            type: 'list<item: utf8, nullable>',
          },
          {
            name: 'parent_id',
            type: 'int64',
          },
          {
            name: 'recurrence',
            type: 'json',
            type_schema: '{}',
          },
          {
            name: 'scope',
            type: 'list<item: utf8, nullable>',
          },
          {
            name: 'start',
            type: 'int64',
          },
          {
            name: 'timezone',
            type: 'utf8',
          },
          {
            name: 'updater_id',
            type: 'int32',
          },
          {
            name: 'additional_properties',
            type: 'json',
            type_schema: '{"utf8":"any"}',
          },
        ],
        relations: [],
        is_paid: true,
      },
    ],
    is_paid: true,
  },
  {
    name: 'datadog_notebooks',
    title: 'Datadog Notebooks',
    description: '',
    columns: [
      {
        name: '_cq_id',
        type: 'uuid',
      },
      {
        name: '_cq_parent_id',
        type: 'uuid',
      },
      {
        name: 'account_name',
        type: 'utf8',
        is_primary_key: true,
      },
      {
        name: 'attributes',
        type: 'json',
        type_schema:
          '{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"author":{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"created_at":"timestamp[us, tz=UTC]","disabled":"bool","email":"utf8","handle":"utf8","icon":"utf8","name":"utf8","status":"utf8","title":"utf8","verified":"bool"},"cells":[{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"attributes":{"notebook_distribution_cell_attributes":{"":"json","additional_properties":"json","definition":"json","graph_size":"utf8","split_by":"json","time":"json"},"notebook_heat_map_cell_attributes":{"":"json","additional_properties":"json","definition":"json","graph_size":"utf8","split_by":"json","time":"json"},"notebook_log_stream_cell_attributes":{"":"json","additional_properties":"json","definition":"json","graph_size":"utf8","time":"json"},"notebook_markdown_cell_attributes":{"":"json","additional_properties":"json","definition":"json"},"notebook_timeseries_cell_attributes":{"":"json","additional_properties":"json","definition":"json","graph_size":"utf8","split_by":"json","time":"json"},"notebook_toplist_cell_attributes":{"":"json","additional_properties":"json","definition":"json","graph_size":"utf8","split_by":"json","time":"json"},"unparsed_object":"any"},"id":"utf8","type":"utf8"}],"created":"timestamp[us, tz=UTC]","metadata":{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"is_template":"bool","take_snapshots":"bool","type":{}},"modified":"timestamp[us, tz=UTC]","name":"utf8","status":"utf8","time":{"notebook_absolute_time":{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"end":"timestamp[us, tz=UTC]","live":"bool","start":"timestamp[us, tz=UTC]"},"notebook_relative_time":{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"live_span":"utf8"},"unparsed_object":"any"}}',
      },
      {
        name: 'id',
        type: 'int64',
        is_primary_key: true,
      },
      {
        name: 'type',
        type: 'utf8',
      },
      {
        name: 'additional_properties',
        type: 'json',
        type_schema: '{"utf8":"any"}',
      },
    ],
    relations: [],
    is_paid: true,
  },
  {
    name: 'datadog_permissions',
    title: 'Datadog Permissions',
    description: '',
    columns: [
      {
        name: '_cq_id',
        type: 'uuid',
      },
      {
        name: '_cq_parent_id',
        type: 'uuid',
      },
      {
        name: 'account_name',
        type: 'utf8',
        is_primary_key: true,
      },
      {
        name: 'attributes',
        type: 'json',
        type_schema:
          '{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"created":"timestamp[us, tz=UTC]","description":"utf8","display_name":"utf8","display_type":"utf8","group_name":"utf8","name":"utf8","restricted":"bool"}',
      },
      {
        name: 'id',
        type: 'utf8',
        is_primary_key: true,
      },
      {
        name: 'type',
        type: 'utf8',
      },
      {
        name: 'additional_properties',
        type: 'json',
        type_schema: '{"utf8":"any"}',
      },
    ],
    relations: [],
    is_paid: true,
  },
  {
    name: 'datadog_roles',
    title: 'Datadog Roles',
    description: '',
    columns: [
      {
        name: '_cq_id',
        type: 'uuid',
      },
      {
        name: '_cq_parent_id',
        type: 'uuid',
      },
      {
        name: 'account_name',
        type: 'utf8',
        is_primary_key: true,
      },
      {
        name: 'attributes',
        type: 'json',
        type_schema:
          '{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"created_at":"timestamp[us, tz=UTC]","modified_at":"timestamp[us, tz=UTC]","name":"utf8","user_count":"int64"}',
      },
      {
        name: 'id',
        type: 'utf8',
        is_primary_key: true,
      },
      {
        name: 'relationships',
        type: 'json',
        type_schema:
          '{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"permissions":{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"data":[{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"id":"utf8","type":"utf8"}]}}',
      },
      {
        name: 'type',
        type: 'utf8',
      },
      {
        name: 'additional_properties',
        type: 'json',
        type_schema: '{"utf8":"any"}',
      },
    ],
    relations: [
      {
        name: 'datadog_role_permissions',
        title: 'Datadog Role Permissions',
        description: '',
        columns: [
          {
            name: '_cq_id',
            type: 'uuid',
          },
          {
            name: '_cq_parent_id',
            type: 'uuid',
          },
          {
            name: 'account_name',
            type: 'utf8',
            is_primary_key: true,
          },
          {
            name: 'role_id',
            type: 'utf8',
            is_primary_key: true,
          },
          {
            name: 'attributes',
            type: 'json',
            type_schema:
              '{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"created":"timestamp[us, tz=UTC]","description":"utf8","display_name":"utf8","display_type":"utf8","group_name":"utf8","name":"utf8","restricted":"bool"}',
          },
          {
            name: 'id',
            type: 'utf8',
            is_primary_key: true,
          },
          {
            name: 'type',
            type: 'utf8',
          },
          {
            name: 'additional_properties',
            type: 'json',
            type_schema: '{"utf8":"any"}',
          },
        ],
        relations: [],
        is_paid: true,
      },
      {
        name: 'datadog_role_users',
        title: 'Datadog Role Users',
        description: '',
        columns: [
          {
            name: '_cq_id',
            type: 'uuid',
          },
          {
            name: '_cq_parent_id',
            type: 'uuid',
          },
          {
            name: 'account_name',
            type: 'utf8',
            is_primary_key: true,
          },
          {
            name: 'role_id',
            type: 'utf8',
            is_primary_key: true,
          },
          {
            name: 'attributes',
            type: 'json',
            type_schema:
              '{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"created_at":"timestamp[us, tz=UTC]","disabled":"bool","email":"utf8","handle":"utf8","icon":"utf8","modified_at":"timestamp[us, tz=UTC]","name":"utf8","service_account":"bool","status":"utf8","title":"utf8","verified":"bool"}',
          },
          {
            name: 'id',
            type: 'utf8',
            is_primary_key: true,
          },
          {
            name: 'relationships',
            type: 'json',
            type_schema:
              '{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"org":{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"data":{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"id":"utf8","type":"utf8"}},"other_orgs":{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"data":[{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"id":"utf8","type":"utf8"}]},"other_users":{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"data":[{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"id":"utf8","type":"utf8"}]},"roles":{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"data":[{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"id":"utf8","type":"utf8"}]}}',
          },
          {
            name: 'type',
            type: 'utf8',
          },
          {
            name: 'additional_properties',
            type: 'json',
            type_schema: '{"utf8":"any"}',
          },
        ],
        relations: [],
        is_paid: true,
      },
    ],
    is_paid: true,
  },
  {
    name: 'datadog_rum_events',
    title: 'Datadog Real User Monitoring (RUM) Events',
    description: '',
    columns: [
      {
        name: '_cq_id',
        type: 'uuid',
      },
      {
        name: '_cq_parent_id',
        type: 'uuid',
      },
      {
        name: 'account_name',
        type: 'utf8',
        is_primary_key: true,
      },
      {
        name: 'attributes',
        type: 'json',
        type_schema:
          '{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"attributes":{"utf8":"any"},"service":"utf8","tags":["utf8"],"timestamp":"timestamp[us, tz=UTC]"}',
      },
      {
        name: 'id',
        type: 'utf8',
        is_primary_key: true,
      },
      {
        name: 'type',
        type: 'utf8',
      },
      {
        name: 'additional_properties',
        type: 'json',
        type_schema: '{"utf8":"any"}',
      },
    ],
    relations: [],
    is_paid: true,
  },
  {
    name: 'datadog_slo_corrections',
    title: 'Datadog SLO Corrections',
    description: '',
    columns: [
      {
        name: '_cq_id',
        type: 'uuid',
      },
      {
        name: '_cq_parent_id',
        type: 'uuid',
      },
      {
        name: 'account_name',
        type: 'utf8',
        is_primary_key: true,
      },
      {
        name: 'attributes',
        type: 'json',
        type_schema:
          '{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"category":"utf8","created_at":"int64","creator":{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"email":"utf8","handle":"utf8","name":"utf8"},"description":"utf8","duration":"int64","end":"int64","modified_at":"int64","modifier":{},"rrule":"utf8","slo_id":"utf8","start":"int64","timezone":"utf8"}',
      },
      {
        name: 'id',
        type: 'utf8',
        is_primary_key: true,
      },
      {
        name: 'type',
        type: 'utf8',
      },
      {
        name: 'additional_properties',
        type: 'json',
        type_schema: '{"utf8":"any"}',
      },
    ],
    relations: [],
    is_paid: true,
  },
  {
    name: 'datadog_slos',
    title: 'Datadog SLOs',
    description: '',
    columns: [
      {
        name: '_cq_id',
        type: 'uuid',
      },
      {
        name: '_cq_parent_id',
        type: 'uuid',
      },
      {
        name: 'account_name',
        type: 'utf8',
        is_primary_key: true,
      },
      {
        name: 'created_at',
        type: 'int64',
      },
      {
        name: 'creator',
        type: 'json',
        type_schema:
          '{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"email":"utf8","handle":"utf8","name":"utf8"}',
      },
      {
        name: 'description',
        type: 'utf8',
      },
      {
        name: 'groups',
        type: 'list<item: utf8, nullable>',
      },
      {
        name: 'id',
        type: 'utf8',
        is_primary_key: true,
      },
      {
        name: 'modified_at',
        type: 'int64',
      },
      {
        name: 'monitor_ids',
        type: 'list<item: int64, nullable>',
      },
      {
        name: 'monitor_tags',
        type: 'list<item: utf8, nullable>',
      },
      {
        name: 'name',
        type: 'utf8',
      },
      {
        name: 'query',
        type: 'json',
        type_schema:
          '{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"denominator":"utf8","numerator":"utf8"}',
      },
      {
        name: 'sli_specification',
        type: 'json',
        type_schema:
          '{"slo_time_slice_spec":{"":{"utf8":"any"},"time_slice":{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"comparator":"utf8","query":{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"formulas":[{"":"json","additional_properties":"json","formula":"utf8"}],"queries":[{"formula_and_function_metric_query_definition":"json","unparsed_object":"any"}]},"query_interval_seconds":"int64","threshold":"float64"}},"unparsed_object":"any"}',
      },
      {
        name: 'tags',
        type: 'list<item: utf8, nullable>',
      },
      {
        name: 'target_threshold',
        type: 'float64',
      },
      {
        name: 'thresholds',
        type: 'json',
        type_schema:
          '[{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"target":"float64","target_display":"utf8","timeframe":"utf8","warning":"float64","warning_display":"utf8"}]',
      },
      {
        name: 'timeframe',
        type: 'utf8',
      },
      {
        name: 'type',
        type: 'utf8',
      },
      {
        name: 'warning_threshold',
        type: 'float64',
      },
      {
        name: 'additional_properties',
        type: 'json',
        type_schema: '{"utf8":"any"}',
      },
    ],
    relations: [],
    is_paid: true,
  },
  {
    name: 'datadog_synthetics',
    title: 'Datadog Synthetics',
    description: '',
    columns: [
      {
        name: '_cq_id',
        type: 'uuid',
      },
      {
        name: '_cq_parent_id',
        type: 'uuid',
      },
      {
        name: 'account_name',
        type: 'utf8',
        is_primary_key: true,
      },
      {
        name: 'config',
        type: 'json',
        type_schema:
          '{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"assertions":[{"synthetics_assertion_json_path_target":{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"operator":"utf8","property":"utf8","target":{"":"json","additional_properties":"json","json_path":"utf8","operator":"utf8","target_value":"any"},"type":"utf8"},"synthetics_assertion_target":{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"operator":"utf8","property":"utf8","target":"any","timings_scope":"utf8","type":"utf8"},"synthetics_assertion_x_path_target":{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"operator":"utf8","property":"utf8","target":{"":"json","additional_properties":"json","operator":"utf8","target_value":"any","x_path":"utf8"},"type":"utf8"},"unparsed_object":"any"}],"config_variables":[{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"example":"utf8","id":"utf8","name":"utf8","pattern":"utf8","secure":"bool","type":"utf8"}],"request":{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"allow_insecure":"bool","basic_auth":{"synthetics_basic_auth_digest":{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"password":"utf8","type":"utf8","username":"utf8"},"synthetics_basic_auth_ntlm":{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"domain":"utf8","password":"utf8","type":"utf8","username":"utf8","workstation":"utf8"},"synthetics_basic_auth_oauth_client":{"":{"utf8":"any"},"access_token_url":"utf8","additional_properties":{"utf8":"any"},"audience":"utf8","client_id":"utf8","client_secret":"utf8","resource":"utf8","scope":"utf8","token_api_authentication":"utf8","type":"utf8"},"synthetics_basic_auth_oauth_rop":{"":{"utf8":"any"},"access_token_url":"utf8","additional_properties":{"utf8":"any"},"audience":"utf8","client_id":"utf8","client_secret":"utf8","password":"utf8","resource":"utf8","scope":"utf8","token_api_authentication":"utf8","type":"utf8","username":"utf8"},"synthetics_basic_auth_sigv4":{"":{"utf8":"any"},"access_key":"utf8","additional_properties":{"utf8":"any"},"region":"utf8","secret_key":"utf8","service_name":"utf8","session_token":"utf8","type":"utf8"},"synthetics_basic_auth_web":{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"password":"utf8","type":"utf8","username":"utf8"},"unparsed_object":"any"},"body":"utf8","body_type":"utf8","call_type":"utf8","certificate":{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"cert":{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"content":"utf8","filename":"utf8","updated_at":"utf8"},"key":{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"content":"utf8","filename":"utf8","updated_at":"utf8"}},"certificate_domains":["utf8"],"compressed_json_descriptor":"utf8","compressed_proto_file":"utf8","dns_server":"utf8","dns_server_port":"int64","files":[{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"bucket_key":"utf8","content":"utf8","name":"utf8","size":"int64","type":"utf8"}],"follow_redirects":"bool","headers":{"utf8":"utf8"},"host":"utf8","http_version":"utf8","message":"utf8","metadata":{"utf8":"utf8"},"method":"utf8","no_saving_response_body":"bool","number_of_packets":"int64","persist_cookies":"bool","port":"int64","proxy":{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"headers":{"utf8":"utf8"},"url":"utf8"},"query":"any","servername":"utf8","service":"utf8","should_track_hops":"bool","timeout":"float64","url":"utf8"},"variables":[{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"example":"utf8","id":"utf8","name":"utf8","pattern":"utf8","secure":"bool","type":"utf8"}]}',
      },
      {
        name: 'creator',
        type: 'json',
        type_schema:
          '{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"email":"utf8","handle":"utf8","name":"utf8"}',
      },
      {
        name: 'locations',
        type: 'list<item: utf8, nullable>',
      },
      {
        name: 'message',
        type: 'utf8',
      },
      {
        name: 'monitor_id',
        type: 'int64',
      },
      {
        name: 'name',
        type: 'utf8',
      },
      {
        name: 'options',
        type: 'json',
        type_schema:
          '{"":{"utf8":"any"},"accept_self_signed":"bool","additional_properties":{"utf8":"any"},"allow_insecure":"bool","check_certificate_revocation":"bool","ci":{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"execution_rule":"utf8"},"device_ids":["utf8"],"disable_cors":"bool","disable_csp":"bool","follow_redirects":"bool","http_version":"utf8","ignore_server_certificate_error":"bool","initial_navigation_timeout":"int64","min_failure_duration":"int64","min_location_failed":"int64","monitor_name":"utf8","monitor_options":{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"renotify_interval":"int64"},"monitor_priority":"int64","no_screenshot":"bool","restricted_roles":["utf8"],"retry":{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"count":"int64","interval":"float64"},"rum_settings":{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"application_id":"utf8","client_token_id":"int64","is_enabled":"bool"},"scheduling":{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"timeframes":[{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"day":"int64","from":"utf8","to":"utf8"}],"timezone":"utf8"},"tick_every":"int64"}',
      },
      {
        name: 'public_id',
        type: 'utf8',
        is_primary_key: true,
      },
      {
        name: 'status',
        type: 'utf8',
      },
      {
        name: 'steps',
        type: 'json',
        type_schema:
          '[{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"allow_failure":"bool","is_critical":"bool","name":"utf8","no_screenshot":"bool","params":"any","timeout":"int64","type":"utf8"}]',
      },
      {
        name: 'subtype',
        type: 'utf8',
      },
      {
        name: 'tags',
        type: 'list<item: utf8, nullable>',
      },
      {
        name: 'type',
        type: 'utf8',
      },
      {
        name: 'additional_properties',
        type: 'json',
        type_schema: '{"utf8":"any"}',
      },
    ],
    relations: [],
    is_paid: true,
  },
  {
    name: 'datadog_users',
    title: 'Datadog Users',
    description: '',
    columns: [
      {
        name: '_cq_id',
        type: 'uuid',
      },
      {
        name: '_cq_parent_id',
        type: 'uuid',
      },
      {
        name: 'account_name',
        type: 'utf8',
        is_primary_key: true,
      },
      {
        name: 'attributes',
        type: 'json',
        type_schema:
          '{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"created_at":"timestamp[us, tz=UTC]","disabled":"bool","email":"utf8","handle":"utf8","icon":"utf8","modified_at":"timestamp[us, tz=UTC]","name":"utf8","service_account":"bool","status":"utf8","title":"utf8","verified":"bool"}',
      },
      {
        name: 'id',
        type: 'utf8',
        is_primary_key: true,
      },
      {
        name: 'relationships',
        type: 'json',
        type_schema:
          '{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"org":{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"data":{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"id":"utf8","type":"utf8"}},"other_orgs":{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"data":[{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"id":"utf8","type":"utf8"}]},"other_users":{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"data":[{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"id":"utf8","type":"utf8"}]},"roles":{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"data":[{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"id":"utf8","type":"utf8"}]}}',
      },
      {
        name: 'type',
        type: 'utf8',
      },
      {
        name: 'additional_properties',
        type: 'json',
        type_schema: '{"utf8":"any"}',
      },
    ],
    relations: [
      {
        name: 'datadog_user_permissions',
        title: 'Datadog User Permissions',
        description: '',
        columns: [
          {
            name: '_cq_id',
            type: 'uuid',
          },
          {
            name: '_cq_parent_id',
            type: 'uuid',
          },
          {
            name: 'account_name',
            type: 'utf8',
            is_primary_key: true,
          },
          {
            name: 'user_id',
            type: 'utf8',
            is_primary_key: true,
          },
          {
            name: 'attributes',
            type: 'json',
            type_schema:
              '{"":{"utf8":"any"},"additional_properties":{"utf8":"any"},"created":"timestamp[us, tz=UTC]","description":"utf8","display_name":"utf8","display_type":"utf8","group_name":"utf8","name":"utf8","restricted":"bool"}',
          },
          {
            name: 'id',
            type: 'utf8',
            is_primary_key: true,
          },
          {
            name: 'type',
            type: 'utf8',
          },
          {
            name: 'additional_properties',
            type: 'json',
            type_schema: '{"utf8":"any"}',
          },
        ],
        relations: [],
        is_paid: true,
      },
    ],
    is_paid: true,
  },
];

export default tablesData;
