const services = [
    {
        "name": "accessanalyzer",
        "label": "Access Analyzer",
        "logo": "images/accessanalyzer.webp",
        "tables": [
            "aws_accessanalyzer_analyzers",
            "aws_accessanalyzer_analyzer_archive_rules",
            "aws_accessanalyzer_analyzer_findings",
            "aws_accessanalyzer_analyzer_findings_v2"
        ]
    },
    {
        "name": "account",
        "label": "Account",
        "logo": "images/account.webp",
        "tables": [
            "aws_account_alternate_contacts",
            "aws_account_contacts"
        ]
    },
    {
        "name": "acm",
        "label": "Certificate Manager [ACM]",
        "shortLabel": "ACM",
        "logo": "images/acm.webp",
        "tables": [
            "aws_acm_certificates"
        ]
    },
    {
        "name": "acmpca",
        "label": "Private Certificate Authority",
        "logo": "images/acmpca.webp",
        "tables": [
            "aws_acmpca_certificate_authorities"
        ]
    },
    {
        "name": "amp",
        "label": "Managed Service for Prometheus",
        "logo": "images/amp.webp",
        "tables": [
            "aws_amp_workspaces",
            "aws_amp_rule_groups_namespaces"
        ]
    },
    {
        "name": "amplify",
        "label": "Amplify",
        "logo": "images/amplify.webp",
        "tables": [
            "aws_amplify_apps"
        ]
    },
    {
        "name": "apigateway",
        "label": "API Gateway",
        "logo": "images/apigateway.webp",
        "tables": [
            "aws_apigateway_api_keys",
            "aws_apigateway_client_certificates",
            "aws_apigateway_domain_names",
            "aws_apigateway_domain_name_base_path_mappings",
            "aws_apigateway_rest_apis",
            "aws_apigateway_rest_api_authorizers",
            "aws_apigateway_rest_api_deployments",
            "aws_apigateway_rest_api_documentation_parts",
            "aws_apigateway_rest_api_documentation_versions",
            "aws_apigateway_rest_api_gateway_responses",
            "aws_apigateway_rest_api_models",
            "aws_apigateway_rest_api_request_validators",
            "aws_apigateway_rest_api_resources",
            "aws_apigateway_rest_api_resource_methods",
            "aws_apigateway_rest_api_resource_method_integrations",
            "aws_apigateway_rest_api_stages",
            "aws_apigateway_usage_plans",
            "aws_apigateway_usage_plan_keys",
            "aws_apigateway_vpc_links"
        ]
    },
    {
        "name": "apigatewayv2",
        "label": "API Gateway V2",
        "logo": "images/apigatewayv2.webp",
        "tables": [
            "aws_apigatewayv2_apis",
            "aws_apigatewayv2_api_authorizers",
            "aws_apigatewayv2_api_deployments",
            "aws_apigatewayv2_api_integrations",
            "aws_apigatewayv2_api_integration_responses",
            "aws_apigatewayv2_api_models",
            "aws_apigatewayv2_api_routes",
            "aws_apigatewayv2_api_route_responses",
            "aws_apigatewayv2_api_stages",
            "aws_apigatewayv2_domain_names",
            "aws_apigatewayv2_domain_name_rest_api_mappings",
            "aws_apigatewayv2_vpc_links"
        ]
    },
    {
        "name": "appconfig",
        "label": "AppConfig",
        "logo": "images/appconfig.webp",
        "tables": [
            "aws_appconfig_applications",
            "aws_appconfig_configuration_profiles",
            "aws_appconfig_hosted_configuration_versions",
            "aws_appconfig_environments",
            "aws_appconfig_deployment_strategies"
        ]
    },
    {
        "name": "appflow",
        "label": "AppFlow",
        "logo": "images/appflow.webp",
        "tables": [
            "aws_appflow_flows"
        ]
    },
    {
        "name": "applicationautoscaling",
        "label": "Application Auto Scaling",
        "logo": "images/applicationautoscaling.webp",
        "tables": [
            "aws_applicationautoscaling_policies",
            "aws_applicationautoscaling_scalable_targets",
            "aws_applicationautoscaling_scaling_activities",
            "aws_applicationautoscaling_scheduled_actions"
        ]
    },
    {
        "name": "appmesh",
        "label": "App Mesh",
        "logo": "images/appmesh.webp",
        "tables": [
            "aws_appmesh_meshes",
            "aws_appmesh_virtual_gateways",
            "aws_appmesh_virtual_nodes",
            "aws_appmesh_virtual_routers",
            "aws_appmesh_virtual_services"
        ]
    },
    {
        "name": "apprunner",
        "label": "App Runner",
        "logo": "images/apprunner.webp",
        "tables": [
            "aws_apprunner_auto_scaling_configurations",
            "aws_apprunner_connections",
            "aws_apprunner_observability_configurations",
            "aws_apprunner_services",
            "aws_apprunner_custom_domains",
            "aws_apprunner_operations",
            "aws_apprunner_vpc_connectors",
            "aws_apprunner_vpc_ingress_connections"
        ]
    },
    {
        "name": "appstream",
        "label": "AppStream",
        "logo": "images/appstream.webp",
        "tables": [
            "aws_appstream_app_blocks",
            "aws_appstream_applications",
            "aws_appstream_application_fleet_associations",
            "aws_appstream_directory_configs",
            "aws_appstream_fleets",
            "aws_appstream_image_builders",
            "aws_appstream_images",
            "aws_appstream_stacks",
            "aws_appstream_stack_entitlements",
            "aws_appstream_stack_user_associations",
            "aws_appstream_usage_report_subscriptions",
            "aws_appstream_users"
        ]
    },
    {
        "name": "appsync",
        "label": "AppSync",
        "logo": "images/appsync.webp",
        "tables": [
            "aws_appsync_graphql_apis"
        ]
    },
    {
        "name": "athena",
        "label": "Athena",
        "logo": "images/athena.webp",
        "tables": [
            "aws_athena_data_catalogs",
            "aws_athena_data_catalog_databases",
            "aws_athena_data_catalog_database_tables",
            "aws_athena_work_groups",
            "aws_athena_work_group_named_queries",
            "aws_athena_work_group_prepared_statements",
            "aws_athena_work_group_query_executions"
        ]
    },
    {
        "name": "auditmanager",
        "label": "Audit Manager",
        "logo": "images/auditmanager.webp",
        "tables": [
            "aws_auditmanager_assessments"
        ]
    },
    {
        "name": "autoscaling",
        "label": "EC2 Auto Scaling",
        "logo": "images/autoscaling.webp",
        "tables": [
            "aws_autoscaling_groups",
            "aws_autoscaling_group_lifecycle_hooks",
            "aws_autoscaling_group_scaling_policies",
            "aws_autoscaling_warm_pools",
            "aws_autoscaling_launch_configurations",
            "aws_autoscaling_plans",
            "aws_autoscaling_plan_resources",
            "aws_autoscaling_scheduled_actions"
        ]
    },
    {
        "name": "availability",
        "label": "Availability",
        "logo": "images/availability.webp",
        "tables": [
            "aws_availability_zones"
        ]
    },
    {
        "name": "backup",
        "label": "Backup",
        "logo": "images/backup.webp",
        "tables": [
            "aws_backup_global_settings",
            "aws_backup_jobs",
            "aws_backup_plans",
            "aws_backup_plan_selections",
            "aws_backup_protected_resources",
            "aws_backup_region_settings",
            "aws_backup_report_plans",
            "aws_backup_vaults",
            "aws_backup_vault_recovery_points"
        ]
    },
    {
        "name": "backupgateway",
        "label": "Backup Gateway",
        "logo": "images/backupgateway.webp",
        "tables": [
            "aws_backupgateway_gateways"
        ]
    },
    {
        "name": "batch",
        "label": "Batch",
        "logo": "images/batch.webp",
        "tables": [
            "aws_batch_compute_environments",
            "aws_batch_job_definitions",
            "aws_batch_job_queues",
            "aws_batch_jobs"
        ]
    },
    {
        "name": "bedrock",
        "label": "bedrock",
        "logo": "images/bedrock.webp",
        "tables": [
            "aws_bedrock_custom_models",
            "aws_bedrock_evaluation_jobs",
            "aws_bedrock_foundation_models",
            "aws_bedrock_guardrails",
            "aws_bedrock_model_copy_jobs",
            "aws_bedrock_model_customization_jobs",
            "aws_bedrock_provisioned_model_throughputs"
        ]
    },
    {
        "name": "budgets",
        "label": "Budgets",
        "logo": "images/budgets.webp",
        "tables": [
            "aws_budgets_actions",
            "aws_budgets_budgets"
        ]
    },
    {
        "name": "cloudformation",
        "label": "CloudFormation",
        "logo": "images/cloudformation.webp",
        "tables": [
            "aws_cloudformation_stack_sets",
            "aws_cloudformation_stack_instance_summaries",
            "aws_cloudformation_stack_instance_resource_drifts",
            "aws_cloudformation_stack_set_operations",
            "aws_cloudformation_stack_set_operation_results",
            "aws_cloudformation_stacks",
            "aws_cloudformation_stack_resources",
            "aws_cloudformation_stack_templates",
            "aws_cloudformation_template_summaries"
        ]
    },
    {
        "name": "cloudfront",
        "label": "CloudFront",
        "logo": "images/cloudfront.webp",
        "tables": [
            "aws_cloudfront_cache_policies",
            "aws_cloudfront_distributions",
            "aws_cloudfront_functions",
            "aws_cloudfront_key_value_stores",
            "aws_cloudfront_origin_access_identities",
            "aws_cloudfront_origin_request_policies",
            "aws_cloudfront_response_headers_policies"
        ]
    },
    {
        "name": "cloudhsmv2",
        "label": "CloudHSM V2",
        "logo": "images/cloudhsmv2.webp",
        "tables": [
            "aws_cloudhsmv2_backups",
            "aws_cloudhsmv2_clusters"
        ]
    },
    {
        "name": "cloudtrail",
        "label": "CloudTrail",
        "logo": "images/cloudtrail.webp",
        "tables": [
            "aws_cloudtrail_channels",
            "aws_cloudtrail_events",
            "aws_cloudtrail_imports",
            "aws_cloudtrail_trails",
            "aws_cloudtrail_trail_event_selectors"
        ]
    },
    {
        "name": "cloudwatch",
        "label": "CloudWatch",
        "logo": "images/cloudwatch.webp",
        "tables": [
            "aws_cloudwatch_alarms",
            "aws_cloudwatch_metric_streams",
            "aws_cloudwatch_metrics",
            "aws_cloudwatch_metric_statistics",
            "aws_cloudwatchlogs_log_groups",
            "aws_cloudwatchlogs_log_group_data_protection_policies",
            "aws_cloudwatchlogs_log_group_subscription_filters",
            "aws_cloudwatchlogs_metric_filters",
            "aws_cloudwatchlogs_resource_policies"
        ]
    },
    {
        "name": "codeartifact",
        "label": "CodeArtifact",
        "logo": "images/codeartifact.webp",
        "tables": [
            "aws_codeartifact_domains",
            "aws_codeartifact_repositories"
        ]
    },
    {
        "name": "codebuild",
        "label": "CodeBuild",
        "logo": "images/codebuild.webp",
        "tables": [
            "aws_codebuild_projects",
            "aws_codebuild_builds",
            "aws_codebuild_source_credentials"
        ]
    },
    {
        "name": "codecommit",
        "label": "CodeCommit",
        "logo": "images/codecommit.webp",
        "tables": [
            "aws_codecommit_repositories"
        ]
    },
    {
        "name": "codedeploy",
        "label": "CodeDeploy",
        "logo": "images/codedeploy.webp",
        "tables": [
            "aws_codedeploy_applications",
            "aws_codedeploy_deployment_groups",
            "aws_codedeploy_deployment_configs",
            "aws_codedeploy_deployments"
        ]
    },
    {
        "name": "codegurureviewer",
        "label": "CodeGuru Reviewer",
        "logo": "images/codegurureviewer.webp",
        "tables": [
            "aws_codegurureviewer_repository_associations"
        ]
    },
    {
        "name": "codepipeline",
        "label": "CodePipeline",
        "logo": "images/codepipeline.webp",
        "tables": [
            "aws_codepipeline_pipelines",
            "aws_codepipeline_webhooks"
        ]
    },
    {
        "name": "cognito",
        "label": "Cognito",
        "logo": "images/cognito.webp",
        "tables": [
            "aws_cognito_identity_pools",
            "aws_cognito_user_pools",
            "aws_cognito_user_pool_identity_providers"
        ]
    },
    {
        "name": "comprehend",
        "label": "Comprehend",
        "logo": "images/comprehend.webp",
        "tables": [
            "aws_comprehend_document_classification_jobs",
            "aws_comprehend_document_classifiers",
            "aws_comprehend_dominant_language_detection_jobs",
            "aws_comprehend_endpoints",
            "aws_comprehend_entities_detection_jobs",
            "aws_comprehend_entity_recognizers",
            "aws_comprehend_events_detection_jobs",
            "aws_comprehend_flywheels",
            "aws_comprehend_flywheel_datasets",
            "aws_comprehend_flywheel_iteration_histories",
            "aws_comprehend_keyphrases_detection_jobs",
            "aws_comprehend_pii_entities_etection_jobs",
            "aws_comprehend_sentiment_detection_jobs",
            "aws_comprehend_targeted_sentiment_detection_jobs",
            "aws_comprehend_topics_detection_jobs"
        ]
    },
    {
        "name": "computeoptimizer",
        "label": "Compute Optimizer",
        "logo": "images/computeoptimizer.webp",
        "tables": [
            "aws_computeoptimizer_autoscaling_group_recommendations",
            "aws_computeoptimizer_ebs_volume_recommendations",
            "aws_computeoptimizer_ec2_instance_recommendations",
            "aws_computeoptimizer_ecs_service_recommendations",
            "aws_computeoptimizer_enrollment_statuses",
            "aws_computeoptimizer_lambda_function_recommendations"
        ]
    },
    {
        "name": "config",
        "label": "Config",
        "logo": "images/config.webp",
        "tables": [
            "aws_config_config_rules",
            "aws_config_config_rule_compliance_details",
            "aws_config_config_rule_compliances",
            "aws_config_remediation_configurations",
            "aws_config_configuration_aggregators",
            "aws_config_configuration_recorders",
            "aws_config_conformance_packs",
            "aws_config_conformance_pack_rule_compliances",
            "aws_config_delivery_channels",
            "aws_config_delivery_channel_statuses",
            "aws_config_retention_configurations"
        ]
    },
    {
        "name": "costexplorer",
        "label": "Cost Explorer",
        "logo": "images/costexplorer.webp",
        "tables": [
            "aws_costexplorer_cost_30d",
            "aws_costexplorer_cost_forecast_30d"
        ]
    },
    {
        "name": "datapipeline",
        "label": "Data Pipeline",
        "logo": "images/datapipeline.webp",
        "tables": [
            "aws_datapipeline_pipelines"
        ]
    },
    {
        "name": "datasync",
        "label": "DataSync",
        "logo": "images/datasync.webp",
        "tables": [
            "aws_datasync_agents",
            "aws_datasync_locations",
            "aws_datasync_azureblob_locations",
            "aws_datasync_efs_locations",
            "aws_datasync_fsxlustre_locations",
            "aws_datasync_fsxontap_locations",
            "aws_datasync_fsxopenzfs_locations",
            "aws_datasync_fsxwindows_locations",
            "aws_datasync_hdfs_locations",
            "aws_datasync_nfs_locations",
            "aws_datasync_objectstorage_locations",
            "aws_datasync_s3_locations",
            "aws_datasync_smb_locations"
        ]
    },
    {
        "name": "dax",
        "label": "DynamoDB Accelerator [DAX]",
        "shortLabel": "DAX",
        "logo": "images/dax.webp",
        "tables": [
            "aws_dax_clusters"
        ]
    },
    {
        "name": "detective",
        "label": "Detective",
        "logo": "images/detective.webp",
        "tables": [
            "aws_detective_graphs",
            "aws_detective_graph_members"
        ]
    },
    {
        "name": "directconnect",
        "label": "Direct Connect",
        "logo": "images/directconnect.webp",
        "tables": [
            "aws_directconnect_connections",
            "aws_directconnect_gateways",
            "aws_directconnect_gateway_associations",
            "aws_directconnect_gateway_attachments",
            "aws_directconnect_lags",
            "aws_directconnect_locations",
            "aws_directconnect_virtual_gateways",
            "aws_directconnect_virtual_interfaces"
        ]
    },
    {
        "name": "directoryservice",
        "label": "Directory Service",
        "logo": "images/directoryservice.webp",
        "tables": [
            "aws_directoryservice_directories"
        ]
    },
    {
        "name": "dms",
        "label": "Database Migration Service [DMS]",
        "shortLabel": "DMS",
        "logo": "images/dms.webp",
        "tables": [
            "aws_dms_certificates",
            "aws_dms_event_subscriptions",
            "aws_dms_replication_instances",
            "aws_dms_replication_subnet_groups",
            "aws_dms_replication_tasks"
        ]
    },
    {
        "name": "docdb",
        "label": "DocumentDB (with MongoDB compatibility)",
        "logo": "images/docdb.webp",
        "tables": [
            "aws_docdb_certificates",
            "aws_docdb_cluster_parameter_groups",
            "aws_docdb_clusters",
            "aws_docdb_cluster_snapshots",
            "aws_docdb_instances",
            "aws_docdb_engine_versions",
            "aws_docdb_cluster_parameters",
            "aws_docdb_orderable_db_instance_options",
            "aws_docdb_event_categories",
            "aws_docdb_event_subscriptions",
            "aws_docdb_events",
            "aws_docdb_global_clusters",
            "aws_docdb_pending_maintenance_actions",
            "aws_docdb_subnet_groups"
        ]
    },
    {
        "name": "dynamodb",
        "label": "DynamoDB",
        "logo": "images/dynamodb.webp",
        "tables": [
            "aws_dynamodb_backups",
            "aws_dynamodb_exports",
            "aws_dynamodb_global_tables",
            "aws_dynamodb_tables",
            "aws_dynamodb_table_continuous_backups",
            "aws_dynamodb_table_replica_auto_scalings",
            "aws_dynamodb_table_resource_policies",
            "aws_dynamodb_table_stream_resource_policies",
            "aws_dynamodbstreams_streams"
        ]
    },
    {
        "name": "ebs",
        "label": "Elastic Block Store [EBS]",
        "shortLabel": "EBS",
        "logo": "images/ebs.webp",
        "tables": [
            "aws_ebs_default_kms_key_ids",
            "aws_ebs_encryption_by_defaults"
        ]
    },
    {
        "name": "ec2",
        "label": "Elastic Compute Cloud [EC2]",
        "shortLabel": "EC2",
        "logo": "images/ec2.webp",
        "tables": [
            "aws_ec2_account_attributes",
            "aws_ec2_byoip_cidrs",
            "aws_ec2_capacity_reservations",
            "aws_ec2_customer_gateways",
            "aws_ec2_dhcp_options",
            "aws_ec2_ebs_snapshots",
            "aws_ec2_ebs_snapshot_attributes",
            "aws_ec2_ebs_volume_statuses",
            "aws_ec2_ebs_volumes",
            "aws_ec2_egress_only_internet_gateways",
            "aws_ec2_eips",
            "aws_ec2_flow_logs",
            "aws_ec2_hosts",
            "aws_ec2_image_block_public_access_states",
            "aws_ec2_images",
            "aws_ec2_image_last_launched_times",
            "aws_ec2_image_launch_permissions",
            "aws_ec2_instance_connect_endpoints",
            "aws_ec2_instance_credit_specifications",
            "aws_ec2_instance_statuses",
            "aws_ec2_instance_types",
            "aws_ec2_instances",
            "aws_ec2_internet_gateways",
            "aws_ec2_ipam_byoasns",
            "aws_ec2_ipam_pools",
            "aws_ec2_ipam_pool_allocations",
            "aws_ec2_ipam_pool_cidrs",
            "aws_ec2_ipam_resource_discoveries",
            "aws_ec2_ipam_discovered_accounts",
            "aws_ec2_ipam_discovered_public_addresses",
            "aws_ec2_ipam_discovered_resource_cidrs",
            "aws_ec2_ipam_resource_discovery_associations",
            "aws_ec2_ipam_scopes",
            "aws_ec2_ipam_resource_cidrs",
            "aws_ec2_ipam_address_history",
            "aws_ec2_ipams",
            "aws_ec2_key_pairs",
            "aws_ec2_launch_templates",
            "aws_ec2_launch_template_versions",
            "aws_ec2_managed_prefix_lists",
            "aws_ec2_nat_gateways",
            "aws_ec2_network_acls",
            "aws_ec2_network_interfaces",
            "aws_ec2_prefix_lists",
            "aws_ec2_regional_configs",
            "aws_ec2_replace_root_volume_tasks",
            "aws_ec2_reserved_instances",
            "aws_ec2_route_tables",
            "aws_ec2_security_groups",
            "aws_ec2_serial_console_access_statuses",
            "aws_ec2_snapshot_block_public_access_states",
            "aws_ec2_spot_fleet_requests",
            "aws_ec2_spot_fleet_instances",
            "aws_ec2_spot_instance_requests",
            "aws_ec2_subnets",
            "aws_ec2_traffic_mirror_filters",
            "aws_ec2_traffic_mirror_sessions",
            "aws_ec2_traffic_mirror_targets",
            "aws_ec2_transit_gateways",
            "aws_ec2_transit_gateway_attachments",
            "aws_ec2_transit_gateway_multicast_domains",
            "aws_ec2_transit_gateway_peering_attachments",
            "aws_ec2_transit_gateway_route_tables",
            "aws_ec2_transit_gateway_vpc_attachments",
            "aws_ec2_vpc_endpoint_connections",
            "aws_ec2_vpc_endpoint_service_configurations",
            "aws_ec2_vpc_endpoint_services",
            "aws_ec2_vpc_endpoint_service_permissions",
            "aws_ec2_vpc_endpoints",
            "aws_ec2_vpc_peering_connections",
            "aws_ec2_vpcs",
            "aws_ec2_vpn_connections",
            "aws_ec2_vpn_gateways"
        ]
    },
    {
        "name": "ecr",
        "label": "Elastic Container Registry [ECR]",
        "shortLabel": "ECR",
        "logo": "images/ecr.webp",
        "tables": [
            "aws_ecr_pull_through_cache_rules",
            "aws_ecr_registries",
            "aws_ecr_registry_policies",
            "aws_ecr_repositories",
            "aws_ecr_repository_images",
            "aws_ecr_repository_image_scan_findings",
            "aws_ecr_repository_lifecycle_policies",
            "aws_ecr_repository_policies"
        ]
    },
    {
        "name": "ecrpublic",
        "label": "ECR Public",
        "logo": "images/ecrpublic.webp",
        "tables": [
            "aws_ecrpublic_repositories",
            "aws_ecrpublic_repository_images"
        ]
    },
    {
        "name": "ecs",
        "label": "Elastic Container Service [ECS]",
        "shortLabel": "ECS",
        "logo": "images/ecs.webp",
        "tables": [
            "aws_ecs_clusters",
            "aws_ecs_cluster_container_instances",
            "aws_ecs_cluster_services",
            "aws_ecs_cluster_task_sets",
            "aws_ecs_cluster_tasks",
            "aws_ecs_task_definitions"
        ]
    },
    {
        "name": "efs",
        "label": "Elastic File System [EFS]",
        "shortLabel": "EFS",
        "logo": "images/efs.webp",
        "tables": [
            "aws_efs_access_points",
            "aws_efs_filesystems"
        ]
    },
    {
        "name": "eks",
        "label": "Elastic Kubernetes Service [EKS]",
        "shortLabel": "EKS",
        "logo": "images/eks.webp",
        "tables": [
            "aws_eks_clusters",
            "aws_eks_cluster_addons",
            "aws_eks_cluster_node_groups",
            "aws_eks_cluster_oidc_identity_provider_configs",
            "aws_eks_fargate_profiles"
        ]
    },
    {
        "name": "elasticache",
        "label": "ElastiCache",
        "logo": "images/elasticache.webp",
        "tables": [
            "aws_elasticache_clusters",
            "aws_elasticache_engine_versions",
            "aws_elasticache_events",
            "aws_elasticache_global_replication_groups",
            "aws_elasticache_parameter_groups",
            "aws_elasticache_replication_groups",
            "aws_elasticache_reserved_cache_nodes",
            "aws_elasticache_reserved_cache_nodes_offerings",
            "aws_elasticache_serverless_cache_snapshots",
            "aws_elasticache_serverless_caches",
            "aws_elasticache_service_updates",
            "aws_elasticache_snapshots",
            "aws_elasticache_subnet_groups",
            "aws_elasticache_update_actions",
            "aws_elasticache_user_groups",
            "aws_elasticache_users"
        ]
    },
    {
        "name": "elasticbeanstalk",
        "label": "Elastic Beanstalk",
        "logo": "images/elasticbeanstalk.webp",
        "tables": [
            "aws_elasticbeanstalk_application_versions",
            "aws_elasticbeanstalk_applications",
            "aws_elasticbeanstalk_environments",
            "aws_elasticbeanstalk_configuration_options",
            "aws_elasticbeanstalk_configuration_settings"
        ]
    },
    {
        "name": "elasticsearch",
        "label": "Elastic Search",
        "logo": "images/elasticsearch.webp",
        "tables": [
            "aws_elasticsearch_domains",
            "aws_elasticsearch_packages",
            "aws_elasticsearch_reserved_instances",
            "aws_elasticsearch_versions",
            "aws_elasticsearch_vpc_endpoints"
        ]
    },
    {
        "name": "elastictranscoder",
        "label": "Elastic Transcoder",
        "logo": "images/elastictranscoder.webp",
        "tables": [
            "aws_elastictranscoder_pipelines",
            "aws_elastictranscoder_pipeline_jobs",
            "aws_elastictranscoder_presets"
        ]
    },
    {
        "name": "elb",
        "label": "Elastic Load Balancing [ELB]",
        "shortLabel": "ELB",
        "logo": "images/elb.webp",
        "tables": [
            "aws_elbv1_load_balancers",
            "aws_elbv1_load_balancer_policies",
            "aws_elbv2_load_balancers",
            "aws_elbv2_listeners",
            "aws_elbv2_listener_certificates",
            "aws_elbv2_listener_rules",
            "aws_elbv2_load_balancer_attributes",
            "aws_elbv2_load_balancer_web_acls",
            "aws_elbv2_target_groups",
            "aws_elbv2_target_group_target_health_descriptions"
        ]
    },
    {
        "name": "emr",
        "label": "Elastic MapReduce [EMR]",
        "shortLabel": "EMR",
        "logo": "images/emr.webp",
        "tables": [
            "aws_emr_block_public_access_configs",
            "aws_emr_clusters",
            "aws_emr_cluster_instance_fleets",
            "aws_emr_cluster_instance_groups",
            "aws_emr_cluster_instances",
            "aws_emr_notebook_executions",
            "aws_emr_steps",
            "aws_emr_release_labels",
            "aws_emr_supported_instance_types",
            "aws_emr_security_configurations",
            "aws_emr_studios",
            "aws_emr_studio_session_mappings"
        ]
    },
    {
        "name": "eventbridge",
        "label": "EventBridge",
        "logo": "images/eventbridge.webp",
        "tables": [
            "aws_eventbridge_api_destinations",
            "aws_eventbridge_archives",
            "aws_eventbridge_connections",
            "aws_eventbridge_endpoints",
            "aws_eventbridge_event_buses",
            "aws_eventbridge_event_bus_rules",
            "aws_eventbridge_event_bus_targets",
            "aws_eventbridge_event_sources",
            "aws_eventbridge_replays"
        ]
    },
    {
        "name": "firehose",
        "label": "Kinesis Data Firehose",
        "logo": "images/firehose.webp",
        "tables": [
            "aws_firehose_delivery_streams"
        ]
    },
    {
        "name": "fis",
        "label": "Fault Injection Service [FIS]",
        "shortLabel": "FIS",
        "logo": "images/fis.webp",
        "tables": [
            "aws_fis_actions",
            "aws_fis_experiment_templates",
            "aws_fis_target_account_configurations",
            "aws_fis_experiments",
            "aws_fis_experiment_resolved_targets",
            "aws_fis_target_resource_types"
        ]
    },
    {
        "name": "frauddetector",
        "label": "Fraud Detector",
        "logo": "images/frauddetector.webp",
        "tables": [
            "aws_frauddetector_batch_imports",
            "aws_frauddetector_batch_predictions",
            "aws_frauddetector_detectors",
            "aws_frauddetector_rules",
            "aws_frauddetector_entity_types",
            "aws_frauddetector_event_types",
            "aws_frauddetector_external_models",
            "aws_frauddetector_labels",
            "aws_frauddetector_models",
            "aws_frauddetector_model_versions",
            "aws_frauddetector_outcomes",
            "aws_frauddetector_variables"
        ]
    },
    {
        "name": "fsx",
        "label": "FSx",
        "logo": "images/fsx.webp",
        "tables": [
            "aws_fsx_backups",
            "aws_fsx_data_repository_associations",
            "aws_fsx_data_repository_tasks",
            "aws_fsx_file_caches",
            "aws_fsx_file_systems",
            "aws_fsx_snapshots",
            "aws_fsx_storage_virtual_machines",
            "aws_fsx_volumes"
        ]
    },
    {
        "name": "glacier",
        "label": "Glacier",
        "logo": "images/glacier.webp",
        "tables": [
            "aws_glacier_data_retrieval_policies",
            "aws_glacier_vaults",
            "aws_glacier_vault_access_policies",
            "aws_glacier_vault_lock_policies",
            "aws_glacier_vault_notifications"
        ]
    },
    {
        "name": "globalaccelerator",
        "label": "Global Accelerator",
        "logo": "images/globalaccelerator.webp",
        "tables": [
            "aws_globalaccelerator_accelerators",
            "aws_globalaccelerator_custom_routing_accelerators"
        ]
    },
    {
        "name": "glue",
        "label": "Glue",
        "logo": "images/glue.webp",
        "tables": [
            "aws_glue_classifiers",
            "aws_glue_connections",
            "aws_glue_crawlers",
            "aws_glue_databases",
            "aws_glue_database_tables",
            "aws_glue_database_table_indexes",
            "aws_glue_datacatalog_encryption_settings",
            "aws_glue_dev_endpoints",
            "aws_glue_jobs",
            "aws_glue_job_runs",
            "aws_glue_ml_transforms",
            "aws_glue_ml_transform_task_runs",
            "aws_glue_registries",
            "aws_glue_registry_schemas",
            "aws_glue_registry_schema_versions",
            "aws_glue_security_configurations",
            "aws_glue_triggers",
            "aws_glue_workflows"
        ]
    },
    {
        "name": "grafana",
        "label": "Managed Grafana",
        "logo": "images/grafana.webp",
        "tables": [
            "aws_grafana_workspaces",
            "aws_grafana_permissions",
            "aws_grafana_versions",
            "aws_grafana_workspace_service_accounts",
            "aws_grafana_workspace_service_account_tokens"
        ]
    },
    {
        "name": "guardduty",
        "label": "GuardDuty",
        "logo": "images/guardduty.webp",
        "tables": [
            "aws_guardduty_detectors",
            "aws_guardduty_detector_filters",
            "aws_guardduty_detector_findings",
            "aws_guardduty_detector_intel_sets",
            "aws_guardduty_detector_ip_sets",
            "aws_guardduty_detector_members",
            "aws_guardduty_detector_publishing_destinations"
        ]
    },
    {
        "name": "health",
        "label": "Health",
        "logo": "images/health.webp",
        "tables": [
            "aws_health_events",
            "aws_health_affected_entities",
            "aws_health_event_details",
            "aws_health_organization_events",
            "aws_health_org_event_details",
            "aws_health_organization_affected_entities"
        ]
    },
    {
        "name": "healthlake",
        "label": "HealthLake",
        "logo": "images/healthlake.webp",
        "tables": [
            "aws_healthlake_fhir_datastores"
        ]
    },
    {
        "name": "iam",
        "label": "Identity and Access Management [IAM]",
        "shortLabel": "IAM",
        "logo": "images/iam.webp",
        "tables": [
            "aws_iam_account_authorization_details",
            "aws_iam_accounts",
            "aws_iam_credential_reports",
            "aws_iam_groups",
            "aws_iam_group_attached_policies",
            "aws_iam_group_last_accessed_details",
            "aws_iam_group_policies",
            "aws_iam_instance_profiles",
            "aws_iam_openid_connect_identity_providers",
            "aws_iam_password_policies",
            "aws_iam_policies",
            "aws_iam_policy_default_versions",
            "aws_iam_policy_last_accessed_details",
            "aws_iam_policy_versions",
            "aws_iam_roles",
            "aws_iam_role_attached_policies",
            "aws_iam_role_last_accessed_details",
            "aws_iam_role_policies",
            "aws_iam_saml_identity_providers",
            "aws_iam_server_certificates",
            "aws_iam_users",
            "aws_iam_mfa_devices",
            "aws_iam_signing_certificates",
            "aws_iam_ssh_public_keys",
            "aws_iam_user_access_keys",
            "aws_iam_user_attached_policies",
            "aws_iam_user_groups",
            "aws_iam_user_last_accessed_details",
            "aws_iam_user_policies",
            "aws_iam_virtual_mfa_devices"
        ]
    },
    {
        "name": "identitystore",
        "label": "Identity Store",
        "logo": "images/identitystore.webp",
        "tables": [
            "aws_identitystore_groups",
            "aws_identitystore_group_memberships",
            "aws_identitystore_users"
        ]
    },
    {
        "name": "inspector2",
        "label": "Inspector",
        "logo": "images/inspector2.webp",
        "tables": [
            "aws_inspector2_covered_resources",
            "aws_inspector2_findings"
        ]
    },
    {
        "name": "inspector",
        "label": "Inspector Classic",
        "logo": "images/inspector.webp",
        "tables": [
            "aws_inspector_findings"
        ]
    },
    {
        "name": "iot",
        "label": "IoT",
        "logo": "images/iot.webp",
        "tables": [
            "aws_iot_billing_groups",
            "aws_iot_ca_certificates",
            "aws_iot_certificates",
            "aws_iot_jobs",
            "aws_iot_policies",
            "aws_iot_security_profiles",
            "aws_iot_streams",
            "aws_iot_thing_groups",
            "aws_iot_thing_types",
            "aws_iot_things",
            "aws_iot_topic_rules"
        ]
    },
    {
        "name": "kafka",
        "label": "Managed Streaming for Kafka [MSK]",
        "shortLabel": "MSK",
        "logo": "images/kafka.webp",
        "tables": [
            "aws_kafka_clusters",
            "aws_kafka_cluster_operations",
            "aws_kafka_cluster_policies",
            "aws_kafka_nodes",
            "aws_kafka_configurations"
        ]
    },
    {
        "name": "keyspaces",
        "label": "Keyspaces",
        "logo": "images/keyspaces.webp",
        "tables": [
            "aws_keyspaces_keyspaces",
            "aws_keyspaces_tables"
        ]
    },
    {
        "name": "kinesis",
        "label": "Kinesis Data Streams",
        "logo": "images/kinesis.webp",
        "tables": [
            "aws_kinesis_streams",
            "aws_kinesis_stream_consumers",
            "aws_kinesis_stream_shards"
        ]
    },
    {
        "name": "kms",
        "label": "Key Management Service [KMS]",
        "shortLabel": "KMS",
        "logo": "images/kms.webp",
        "tables": [
            "aws_kms_aliases",
            "aws_kms_keys",
            "aws_kms_key_grants",
            "aws_kms_key_policies",
            "aws_kms_key_rotation_statuses",
            "aws_kms_key_rotations"
        ]
    },
    {
        "name": "lambda",
        "label": "Lambda",
        "logo": "images/lambda.webp",
        "tables": [
            "aws_lambda_functions",
            "aws_lambda_function_aliases",
            "aws_lambda_function_concurrency_configs",
            "aws_lambda_function_event_invoke_configs",
            "aws_lambda_function_event_source_mappings",
            "aws_lambda_function_url_configs",
            "aws_lambda_function_versions",
            "aws_lambda_layers",
            "aws_lambda_layer_versions",
            "aws_lambda_layer_version_policies",
            "aws_lambda_runtimes"
        ]
    },
    {
        "name": "lexv2",
        "label": "Lex V2",
        "logo": "images/lexv2.webp",
        "tables": [
            "aws_lexv2_bots",
            "aws_lexv2_bot_aliases"
        ]
    },
    {
        "name": "lightsail",
        "label": "Lightsail",
        "logo": "images/lightsail.webp",
        "tables": [
            "aws_lightsail_alarms",
            "aws_lightsail_buckets",
            "aws_lightsail_bucket_access_keys",
            "aws_lightsail_certificates",
            "aws_lightsail_container_services",
            "aws_lightsail_container_service_deployments",
            "aws_lightsail_container_service_images",
            "aws_lightsail_database_snapshots",
            "aws_lightsail_databases",
            "aws_lightsail_database_events",
            "aws_lightsail_database_log_events",
            "aws_lightsail_database_parameters",
            "aws_lightsail_disks",
            "aws_lightsail_disk_snapshots",
            "aws_lightsail_distributions",
            "aws_lightsail_instance_snapshots",
            "aws_lightsail_instances",
            "aws_lightsail_instance_port_states",
            "aws_lightsail_load_balancers",
            "aws_lightsail_load_balancer_tls_certificates",
            "aws_lightsail_static_ips"
        ]
    },
    {
        "name": "memorydb",
        "label": "MemoryDB",
        "logo": "images/memorydb.webp",
        "tables": [
            "aws_memorydb_reserved_nodes"
        ]
    },
    {
        "name": "mq",
        "label": "MQ",
        "logo": "images/mq.webp",
        "tables": [
            "aws_mq_brokers",
            "aws_mq_broker_configurations",
            "aws_mq_broker_configuration_revisions",
            "aws_mq_broker_users"
        ]
    },
    {
        "name": "mwaa",
        "label": "Managed Workflows for Apache Airflow [MWAA]",
        "shortLabel": "MWAA",
        "logo": "images/mwaa.webp",
        "tables": [
            "aws_mwaa_environments"
        ]
    },
    {
        "name": "neptune",
        "label": "Neptune",
        "logo": "images/neptune.webp",
        "tables": [
            "aws_neptune_cluster_parameter_groups",
            "aws_neptune_cluster_parameter_group_parameters",
            "aws_neptune_cluster_snapshots",
            "aws_neptune_clusters",
            "aws_neptune_db_parameter_groups",
            "aws_neptune_db_parameter_group_db_parameters",
            "aws_neptune_event_subscriptions",
            "aws_neptune_global_clusters",
            "aws_neptune_instances",
            "aws_neptune_subnet_groups"
        ]
    },
    {
        "name": "networkfirewall",
        "label": "Network Firewall",
        "logo": "images/networkfirewall.webp",
        "tables": [
            "aws_networkfirewall_firewall_policies",
            "aws_networkfirewall_firewalls",
            "aws_networkfirewall_rule_groups",
            "aws_networkfirewall_tls_inspection_configurations"
        ]
    },
    {
        "name": "networkmanager",
        "label": "Network Manager",
        "logo": "images/networkmanager.webp",
        "tables": [
            "aws_networkmanager_global_networks",
            "aws_networkmanager_links",
            "aws_networkmanager_sites",
            "aws_networkmanager_transit_gateway_registrations"
        ]
    },
    {
        "name": "opensearch",
        "label": "OpenSearch",
        "logo": "images/opensearch.webp",
        "tables": [
            "aws_opensearch_domains",
            "aws_opensearch_domain_maintenances",
            "aws_opensearch_domain_nodes",
            "aws_opensearch_domain_packages",
            "aws_opensearch_reserved_instances",
            "aws_opensearch_versions"
        ]
    },
    {
        "name": "organization",
        "label": "Organization",
        "logo": "images/organization.webp",
        "tables": [
            "aws_organization_resource_policies"
        ]
    },
    {
        "name": "organizations",
        "label": "Organizations",
        "logo": "images/organizations.webp",
        "tables": [
            "aws_organizations",
            "aws_organizations_accounts",
            "aws_organizations_account_parents",
            "aws_organizations_delegated_administrators",
            "aws_organizations_delegated_services",
            "aws_organizations_organizational_units",
            "aws_organizations_organizational_unit_parents",
            "aws_organizations_policies",
            "aws_organizations_roots"
        ]
    },
    {
        "name": "pinpoint",
        "label": "Pinpoint",
        "logo": "images/pinpoint.webp",
        "tables": [
            "aws_pinpoint_apps"
        ]
    },
    {
        "name": "qldb",
        "label": "QLDB",
        "logo": "images/qldb.webp",
        "tables": [
            "aws_qldb_ledgers",
            "aws_qldb_ledger_journal_kinesis_streams",
            "aws_qldb_ledger_journal_s3_exports"
        ]
    },
    {
        "name": "quicksight",
        "label": "QuickSight",
        "logo": "images/quicksight.webp",
        "tables": [
            "aws_quicksight_analyses",
            "aws_quicksight_dashboards",
            "aws_quicksight_data_sets",
            "aws_quicksight_ingestions",
            "aws_quicksight_data_sources",
            "aws_quicksight_folders",
            "aws_quicksight_groups",
            "aws_quicksight_group_members",
            "aws_quicksight_templates",
            "aws_quicksight_users"
        ]
    },
    {
        "name": "ram",
        "label": "Resource Access Manager",
        "logo": "images/ram.webp",
        "tables": [
            "aws_ram_principals",
            "aws_ram_resource_share_associations",
            "aws_ram_resource_share_invitations",
            "aws_ram_resource_shares",
            "aws_ram_resource_share_permissions",
            "aws_ram_resource_types",
            "aws_ram_resources"
        ]
    },
    {
        "name": "rds",
        "label": "Relational Database Service [RDS]",
        "shortLabel": "RDS",
        "logo": "images/rds.webp",
        "tables": [
            "aws_rds_certificates",
            "aws_rds_cluster_parameter_groups",
            "aws_rds_cluster_parameter_group_parameters",
            "aws_rds_cluster_snapshots",
            "aws_rds_clusters",
            "aws_rds_cluster_backtracks",
            "aws_rds_db_parameter_groups",
            "aws_rds_db_parameter_group_db_parameters",
            "aws_rds_db_proxies",
            "aws_rds_db_proxy_target_groups",
            "aws_rds_db_proxy_targets",
            "aws_rds_db_proxy_endpoints",
            "aws_rds_db_security_groups",
            "aws_rds_db_snapshots",
            "aws_rds_engine_versions",
            "aws_rds_cluster_parameters",
            "aws_rds_event_subscriptions",
            "aws_rds_events",
            "aws_rds_global_clusters",
            "aws_rds_instances",
            "aws_rds_instance_resource_metrics",
            "aws_rds_option_groups",
            "aws_rds_pending_maintenance_actions",
            "aws_rds_reserved_instances",
            "aws_rds_subnet_groups"
        ]
    },
    {
        "name": "redshift",
        "label": "Redshift",
        "logo": "images/redshift.webp",
        "tables": [
            "aws_redshift_clusters",
            "aws_redshift_cluster_parameter_groups",
            "aws_redshift_cluster_parameters",
            "aws_redshift_endpoint_accesses",
            "aws_redshift_endpoint_authorizations",
            "aws_redshift_snapshots",
            "aws_redshift_data_shares",
            "aws_redshift_event_subscriptions",
            "aws_redshift_events",
            "aws_redshift_reserved_nodes",
            "aws_redshift_subnet_groups"
        ]
    },
    {
        "name": "regions",
        "label": "Regions",
        "logo": "images/regions.webp",
        "tables": [
            "aws_regions"
        ]
    },
    {
        "name": "resiliencehub",
        "label": "Resilience Hub",
        "logo": "images/resiliencehub.webp",
        "tables": [
            "aws_resiliencehub_apps",
            "aws_resiliencehub_app_assessments",
            "aws_resiliencehub_alarm_recommendations",
            "aws_resiliencehub_app_component_compliances",
            "aws_resiliencehub_component_recommendations",
            "aws_resiliencehub_recommendation_templates",
            "aws_resiliencehub_sop_recommendations",
            "aws_resiliencehub_test_recommendations",
            "aws_resiliencehub_app_versions",
            "aws_resiliencehub_app_version_resource_mappings",
            "aws_resiliencehub_app_version_resources",
            "aws_resiliencehub_resiliency_policies",
            "aws_resiliencehub_suggested_resiliency_policies"
        ]
    },
    {
        "name": "resourcegroups",
        "label": "Resource Groups",
        "logo": "images/resourcegroups.webp",
        "tables": [
            "aws_resourcegroups_resource_groups"
        ]
    },
    {
        "name": "route53",
        "label": "Route 53",
        "logo": "images/route53.webp",
        "tables": [
            "aws_route53_delegation_sets",
            "aws_route53_domains",
            "aws_route53_health_checks",
            "aws_route53_hosted_zones",
            "aws_route53_hosted_zone_query_logging_configs",
            "aws_route53_hosted_zone_resource_record_sets",
            "aws_route53_hosted_zone_traffic_policy_instances",
            "aws_route53_operations",
            "aws_route53_traffic_policies",
            "aws_route53_traffic_policy_versions",
            "aws_route53recoverycontrolconfig_clusters",
            "aws_route53recoverycontrolconfig_control_panels",
            "aws_route53recoverycontrolconfig_routing_controls",
            "aws_route53recoverycontrolconfig_safety_rules",
            "aws_route53recoveryreadiness_cells",
            "aws_route53recoveryreadiness_readiness_checks",
            "aws_route53recoveryreadiness_recovery_groups",
            "aws_route53recoveryreadiness_resource_sets",
            "aws_route53resolver_firewall_configs",
            "aws_route53resolver_firewall_domain_lists",
            "aws_route53resolver_firewall_rule_group_associations",
            "aws_route53resolver_firewall_rule_groups",
            "aws_route53resolver_resolver_endpoints",
            "aws_route53resolver_resolver_query_log_config_associations",
            "aws_route53resolver_resolver_query_log_configs",
            "aws_route53resolver_resolver_rule_associations",
            "aws_route53resolver_resolver_rules"
        ]
    },
    {
        "name": "s3",
        "label": "Simple Storage Service [S3]",
        "shortLabel": "S3",
        "logo": "images/s3.webp",
        "tables": [
            "aws_s3_access_grant_instances",
            "aws_s3_access_grants",
            "aws_s3_access_points",
            "aws_s3_accounts",
            "aws_s3_buckets",
            "aws_s3_bucket_cors_rules",
            "aws_s3_bucket_encryption_rules",
            "aws_s3_bucket_grants",
            "aws_s3_bucket_lifecycles",
            "aws_s3_bucket_loggings",
            "aws_s3_bucket_notification_configurations",
            "aws_s3_bucket_object_lock_configurations",
            "aws_s3_bucket_object_grants",
            "aws_s3_bucket_object_heads",
            "aws_s3_bucket_ownership_controls",
            "aws_s3_bucket_policies",
            "aws_s3_bucket_public_access_blocks",
            "aws_s3_bucket_replications",
            "aws_s3_bucket_versionings",
            "aws_s3_bucket_websites",
            "aws_s3_multi_region_access_points"
        ]
    },
    {
        "name": "sagemaker",
        "label": "SageMaker",
        "logo": "images/sagemaker.webp",
        "tables": [
            "aws_sagemaker_apps",
            "aws_sagemaker_endpoint_configurations",
            "aws_sagemaker_endpoints",
            "aws_sagemaker_models",
            "aws_sagemaker_notebook_instances",
            "aws_sagemaker_training_jobs"
        ]
    },
    {
        "name": "savingsplans",
        "label": "Savings Plans",
        "logo": "images/savingsplans.webp",
        "tables": [
            "aws_savingsplans_plans"
        ]
    },
    {
        "name": "scheduler",
        "label": "EventBridge Scheduler",
        "logo": "images/scheduler.webp",
        "tables": [
            "aws_scheduler_schedule_groups",
            "aws_scheduler_schedules"
        ]
    },
    {
        "name": "secretsmanager",
        "label": "Secrets Manager",
        "logo": "images/secretsmanager.webp",
        "tables": [
            "aws_secretsmanager_secrets",
            "aws_secretsmanager_secret_versions"
        ]
    },
    {
        "name": "securityhub",
        "label": "Security Hub",
        "logo": "images/securityhub.webp",
        "tables": [
            "aws_securityhub_enabled_standards",
            "aws_securityhub_findings",
            "aws_securityhub_hubs"
        ]
    },
    {
        "name": "servicecatalog",
        "label": "Service Catalog",
        "logo": "images/servicecatalog.webp",
        "tables": [
            "aws_servicecatalog_portfolios",
            "aws_servicecatalog_products",
            "aws_servicecatalog_provisioned_products",
            "aws_servicecatalog_launch_paths",
            "aws_servicecatalog_provisioning_parameters",
            "aws_servicecatalog_provisioning_artifacts"
        ]
    },
    {
        "name": "servicediscovery",
        "label": "Service Discovery",
        "logo": "images/servicediscovery.webp",
        "tables": [
            "aws_servicediscovery_namespaces",
            "aws_servicediscovery_services",
            "aws_servicediscovery_instances"
        ]
    },
    {
        "name": "servicequotas",
        "label": "Service Quotas",
        "logo": "images/servicequotas.webp",
        "tables": [
            "aws_servicequotas_services",
            "aws_servicequotas_quotas"
        ]
    },
    {
        "name": "ses",
        "label": "Simple Email Service [SES]",
        "shortLabel": "SES",
        "logo": "images/ses.webp",
        "tables": [
            "aws_ses_active_receipt_rule_sets",
            "aws_ses_configuration_sets",
            "aws_ses_configuration_set_event_destinations",
            "aws_ses_contact_lists",
            "aws_ses_custom_verification_email_templates",
            "aws_ses_identities",
            "aws_ses_templates"
        ]
    },
    {
        "name": "shield",
        "label": "Shield Advanced",
        "logo": "images/shield.webp",
        "tables": [
            "aws_shield_attacks",
            "aws_shield_protection_groups",
            "aws_shield_protections",
            "aws_shield_subscriptions"
        ]
    },
    {
        "name": "signer",
        "label": "Signer",
        "logo": "images/signer.webp",
        "tables": [
            "aws_signer_signing_profiles"
        ]
    },
    {
        "name": "sns",
        "label": "Simple Notification Service [SNS]",
        "shortLabel": "SNS",
        "logo": "images/sns.webp",
        "tables": [
            "aws_sns_subscriptions",
            "aws_sns_topics"
        ]
    },
    {
        "name": "sqs",
        "label": "Simple Queue Service [SQS]",
        "shortLabel": "SQS",
        "logo": "images/sqs.webp",
        "tables": [
            "aws_sqs_queues"
        ]
    },
    {
        "name": "ssm",
        "label": "Systems Manager",
        "logo": "images/ssm.webp",
        "tables": [
            "aws_ssm_associations",
            "aws_ssm_command_invocations",
            "aws_ssm_compliance_summary_items",
            "aws_ssm_documents",
            "aws_ssm_document_versions",
            "aws_ssm_instances",
            "aws_ssm_instance_compliance_items",
            "aws_ssm_instance_patches",
            "aws_ssm_inventories",
            "aws_ssm_inventory_entries",
            "aws_ssm_inventory_schemas",
            "aws_ssm_parameters",
            "aws_ssm_patch_baselines",
            "aws_ssm_sessions",
            "aws_ssmincidents_incidents",
            "aws_ssmincidents_incident_findings",
            "aws_ssmincidents_incident_related_items",
            "aws_ssmincidents_incident_timeline_events",
            "aws_ssmincidents_response_plans"
        ]
    },
    {
        "name": "ssoadmin",
        "label": "Single Sign-On Admin",
        "logo": "images/ssoadmin.webp",
        "tables": [
            "aws_ssoadmin_instances",
            "aws_ssoadmin_permission_sets",
            "aws_ssoadmin_permission_set_account_assignments",
            "aws_ssoadmin_permission_set_customer_managed_policies",
            "aws_ssoadmin_permission_set_inline_policies",
            "aws_ssoadmin_permission_set_managed_policies",
            "aws_ssoadmin_permission_set_permissions_boundaries",
            "aws_ssoadmin_trusted_token_issuers"
        ]
    },
    {
        "name": "stepfunctions",
        "label": "Step Functions",
        "logo": "images/stepfunctions.webp",
        "tables": [
            "aws_stepfunctions_activities",
            "aws_stepfunctions_state_machines",
            "aws_stepfunctions_executions",
            "aws_stepfunctions_map_runs",
            "aws_stepfunctions_map_run_executions"
        ]
    },
    {
        "name": "support",
        "label": "Support",
        "logo": "images/support.webp",
        "tables": [
            "aws_support_cases",
            "aws_support_case_communications",
            "aws_support_services",
            "aws_support_severity_levels",
            "aws_support_trusted_advisor_checks",
            "aws_support_trusted_advisor_check_results",
            "aws_support_trusted_advisor_check_summaries"
        ]
    },
    {
        "name": "swf",
        "label": "Simple Workflow Service",
        "logo": "images/swf.webp",
        "tables": [
            "aws_swf_domains",
            "aws_swf_activity_types",
            "aws_swf_closed_workflow_executions",
            "aws_swf_open_workflow_executions",
            "aws_swf_workflow_types"
        ]
    },
    {
        "name": "timestream",
        "label": "Timestream",
        "logo": "images/timestream.webp",
        "tables": [
            "aws_timestream_databases",
            "aws_timestream_tables"
        ]
    },
    {
        "name": "transcribe",
        "label": "Transcribe",
        "logo": "images/transcribe.webp",
        "tables": [
            "aws_transcribe_call_analytics_categories",
            "aws_transcribe_call_analytics_jobs",
            "aws_transcribe_language_models",
            "aws_transcribe_medical_scribe_jobs",
            "aws_transcribe_medical_transcription_jobs",
            "aws_transcribe_medical_vocabularies",
            "aws_transcribe_transcription_jobs",
            "aws_transcribe_vocabularies",
            "aws_transcribe_vocabulary_filters"
        ]
    },
    {
        "name": "transfer",
        "label": "Transfer Family",
        "logo": "images/transfer.webp",
        "tables": [
            "aws_transfer_certificates",
            "aws_transfer_connectors",
            "aws_transfer_profiles",
            "aws_transfer_servers",
            "aws_transfer_agreements",
            "aws_transfer_users",
            "aws_transfer_workflows"
        ]
    },
    {
        "name": "waf",
        "label": "Web Application Firewall [WAF]",
        "shortLabel": "WAF",
        "logo": "images/waf.webp",
        "tables": [
            "aws_waf_rule_groups",
            "aws_waf_rules",
            "aws_waf_subscribed_rule_groups",
            "aws_waf_web_acls"
        ]
    },
    {
        "name": "wafregional",
        "label": "Web Application Firewall [WAF Regional]",
        "shortLabel": "WAF Regional",
        "logo": "images/wafregional.webp",
        "tables": [
            "aws_wafregional_rate_based_rules",
            "aws_wafregional_rule_groups",
            "aws_wafregional_rules",
            "aws_wafregional_web_acls"
        ]
    },
    {
        "name": "wafv2",
        "label": "Web Application Firewall [WAF V2]",
        "shortLabel": "WAF V2",
        "logo": "images/wafv2.webp",
        "tables": [
            "aws_wafv2_ipsets",
            "aws_wafv2_managed_rule_groups",
            "aws_wafv2_regex_pattern_sets",
            "aws_wafv2_rule_groups",
            "aws_wafv2_web_acls"
        ]
    },
    {
        "name": "wellarchitected",
        "label": "Well-Architected Tool",
        "logo": "images/wellarchitected.webp",
        "tables": [
            "aws_wellarchitected_lenses",
            "aws_wellarchitected_share_invitations",
            "aws_wellarchitected_workloads",
            "aws_wellarchitected_workload_milestones",
            "aws_wellarchitected_lens_reviews",
            "aws_wellarchitected_lens_review_improvements",
            "aws_wellarchitected_workload_shares"
        ]
    },
    {
        "name": "workspaces",
        "label": "WorkSpaces",
        "logo": "images/workspaces.webp",
        "tables": [
            "aws_workspaces_connection_aliases",
            "aws_workspaces_connection_alias_permissions",
            "aws_workspaces_directories",
            "aws_workspaces_workspaces"
        ]
    },
    {
        "name": "xray",
        "label": "X-Ray",
        "logo": "images/xray.webp",
        "tables": [
            "aws_xray_encryption_configs",
            "aws_xray_groups",
            "aws_xray_resource_policies",
            "aws_xray_sampling_rules"
        ]
    }
]

export default services;