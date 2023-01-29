import { ChannelModel, ServerModel, UserModel } from '../../src/types';

export interface InsightChartProps {
    insight: SanitizedInsightModel;
    width?: number;
    height?: number;
    data: {}[];
    names: string[];
}

export enum CompareLabelType {
    Current = 'current',
    Previous = 'previous',
}

export enum AOInsightCategories {
    help = 'Help Channels',
    discoverability = 'Discoverability',
    misc = 'Misc',
}

export interface SanitizedResultModel {
    //action: ActionFilter
    //actions?: ActionFilter[]
    count: number;
    data: number[];
    days: string[];
    dates?: string[];
    //label: string;
    labels: string[];
    breakdown_value?: string | number;
    aggregated_value: number;
    status?: string;
    compare_label?: CompareLabelType;
    compare?: boolean;
    persons_urls?: { url: string }[];
    //persons?: Person
    ao_users: UserModel[];
    ao_channels: ChannelModel[];
    ao_servers: ServerModel[];
    //filter?: FilterType
    ao_custom_name: string;
}

export interface SanitizedInsightModel {
    /** The unique key we use when communicating with the user, e.g. in URLs */
    //short_id: InsightShortId
    /** The primary key in the database, used as well in API endpoints */
    id: string;
    name: string;
    derived_name?: string | null;
    description?: string;
    favorited?: boolean;
    order: number | null;
    deleted: boolean;
    saved: boolean;
    created_at: string;
    ao_filters: SanitizedFilterModel;
    results: SanitizedResultModel[];
    //created_by: UserBasicType | null
    refreshing: boolean;
    is_sample: boolean;
    dashboards: number[] | null;
    updated_at: string;
    tags?: string[];
    last_modified_at: string;
    //last_modified_by: UserBasicType | null
    //effective_restriction_level: DashboardRestrictionLevel
    //effective_privilege_level: DashboardPrivilegeLevel
    timezone?: string | null;
    /** Only used in the frontend to store the next breakdown url */
    next?: string;
}

export enum ChartDisplayType {
    ActionsLineGraph = 'ActionsLineGraph',
    ActionsLineGraphCumulative = 'ActionsLineGraphCumulative',
    ActionsTable = 'ActionsTable',
    ActionsPie = 'ActionsPie',
    ActionsBar = 'ActionsBar',
    ActionsBarValue = 'ActionsBarValue',
    PathsViz = 'PathsViz',
    FunnelViz = 'FunnelViz',
    WorldMap = 'WorldMap',
    BoldNumber = 'BoldNumber',
}

export interface SanitizedFilterModel {
    insight?: SanitizedInsightModel;
    display?: ChartDisplayType;
    //interval?: IntervalType;
    // Specifies that we want to smooth the aggregation over the specified
    // number of intervals, e.g. for a day interval, we may want to smooth over
    // 7 days to remove weekly variation. Smoothing is performed as a moving average.
    smoothing_intervals?: number;
    date_from?: string | null;
    date_to?: string | null;
    //properties?: AnyPropertyFilter[] | PropertyGroupFilter;
    events?: Record<string, any>[];
    event?: string; // specify one event
    actions?: Record<string, any>[];
    //breakdown_type?: BreakdownType | null;
    //breakdown?: BreakdownKeyType;
    //breakdowns?: Breakdown[];
    breakdown_value?: string | number;
    breakdown_group_type_index?: number | null;
    //shown_as?: ShownAsValue;
    session?: string;
    period?: string;

    //retention_type?: RetentionType;
    retention_reference?: 'total' | 'previous'; // retention wrt cohort size or previous period
    total_intervals?: number; // retention total intervals
    new_entity?: Record<string, any>[];
    returning_entity?: Record<string, any>;
    target_entity?: Record<string, any>;
    //path_type?: PathType;
    //include_event_types?: PathType[];
    start_point?: string;
    end_point?: string;
    path_groupings?: string[];
    stickiness_days?: number;
    //type?: EntityType;
    entity_id?: string | number;
    //entity_type?: EntityType;
    entity_math?: string;
    people_day?: any;
    people_action?: any;
    formula?: any;
    filter_test_accounts?: boolean;
    from_dashboard?: boolean | number;
    //layout?: FunnelLayout; // used only for funnels
    funnel_step?: number;
    entrance_period_start?: string; // this and drop_off is used for funnels time conversion date for the persons modal
    drop_off?: boolean;
    //funnel_viz_type?: FunnelVizType; // parameter sent to funnels API for time conversion code path
    funnel_from_step?: number; // used in time to convert: initial step index to compute time to convert
    funnel_to_step?: number; // used in time to convert: ending step index to compute time to convert
    funnel_step_breakdown?: string | number[] | number | null; // used in steps breakdown: persons modal
    compare?: boolean;
    //bin_count?: BinCountValue; // used in time to convert: number of bins to show in histogram
    //funnel_window_interval_unit?: FunnelConversionWindowTimeUnit; // minutes, days, weeks, etc. for conversion window
    funnel_window_interval?: number | undefined; // length of conversion window

    //funnel_order_type?: StepOrderValue;
    //exclusions?: FunnelStepRangeEntityFilter[]; // used in funnel exclusion filters
    exclude_events?: string[]; // Paths Exclusion type
    step_limit?: number; // Paths Step Limit
    path_start_key?: string; // Paths People Start Key
    path_end_key?: string; // Paths People End Key
    path_dropoff_key?: string; // Paths People Dropoff Key
    path_replacements?: boolean;
    local_path_cleaning_filters?: Record<string, any>[];
    funnel_filter?: Record<string, any>; // Funnel Filter used in Paths

    //funnel_paths?: FunnelPathType;
    edge_limit?: number | undefined; // Paths edge limit
    min_edge_weight?: number | undefined; // Paths
    max_edge_weight?: number | undefined; // Paths
    funnel_correlation_person_entity?: Record<string, any>; // Funnel Correlation Persons Filter
    funnel_correlation_person_converted?: 'true' | 'false'; // Funnel Correlation Persons Converted - success or failure counts
    funnel_custom_steps?: number[]; // used to provide custom steps for which to get people in a funnel - primarily for correlation use
    aggregation_group_type_index?: number | undefined; // Groups aggregation
    funnel_advanced?: boolean; // used to toggle advanced options on or off
    show_legend?: boolean; // used to show/hide legend next to insights graph
    hidden_legend_keys?: Record<string, boolean | undefined>; // used to toggle visibilities in table and legend

    //breakdown_attribution_type?: BreakdownAttributionType; // funnels breakdown attribution type
    breakdown_attribution_value?: number; // funnels breakdown attribution specific step value
    breakdown_histogram_bin_count?: number; // trends breakdown histogram bin count
}
